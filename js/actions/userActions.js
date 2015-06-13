import Promise from 'bluebird';
import dispatcher from '../dispatcher/AppDispatcher.js';
import { user as constants } from '../constants/actionTypes.js';
import userResource from '../userResource.js';
import permissionResource from '../permissionResource.js';
import Firebase from 'firebase';
import sharingPermissionStore from '../stores/sharingPermissionStore.js';


const FIREBASE_URL = 'https://luminous-fire-4753.firebaseio.com';
const ref = new Firebase(FIREBASE_URL);
const PERMISSIONS_KEY = 'permissions';

function get() {
    userResource
        .getRef()
        .once('value', (snapshot) => {
            var user = snapshot.val();

            if (!user) {
                throw new Error('something went wrong when fetching user data').stack;
            }


            dispatcher.dispatch({
                actionType: constants.SET,
                data: {
                    user: user
                }
            });
        })
}

function update(user) {
    userResource
        .getRef()
        .update(user, (error) => {
            if (error) {
                throw new Error('Something went wrong trying to update the user').stack;
            }

            dispatcher.dispatch({
                actionType: constants.UPDATE,
                data: {
                    user: user
                }
            });

        })
}



function shareTo(activeUserID, passiveUserEmail) {
    var newPermission = {
        activeUser: activeUserID,
        passiveUser: null,
        write: true,
        read: true
    };

    dispatcher.dispatch({
        actionType: constants.SHARE_TO_START
    });

    userResource
        .getByEmail(passiveUserEmail)
        .catch((reason) => {
            if (reason = 'user not found') {
                alert(`El usuario ${passiveUserEmail} no existe`);

                dispatcher.dispatch({
                    actionType: constants.SHARE_TO_ERROR_USER_NOT_FOUND
                });
                throw reason;
            }
        })
        .then((passiveUser) => {
            newPermission.passiveUser = passiveUser.userId;

            let permissions = sharingPermissionStore.getState().activePermissions;
            permissions.forEach((p) => {
                if (p.passiveUser === passiveUser.userId) {
                    alert(`Ya esta compartiendo su informacion con el usuario ${passiveUserEmail}`);
                    dispatcher.dispatch({
                        actionType: constants.SHARE_TO_ERROR_DUPLICATED_PASSIVE_USER
                    });
                    throw 'duplicate passive user';
                }
            })



            // Save the freaking new permission
            ref
                .child(PERMISSIONS_KEY)
                .push(newPermission, (error) => {
                    if (error) {
                        throw new Error('Algo salio mal al compartir').stack;
                    }


                    dispatcher.dispatch({
                        actionType: constants.SHARE_TO_END,
                        data: {
                            permission: newPermission
                        }
                    });
                })

        })
}


// We are not giving a fuck about write/read permissions
// for simplicity for now
function getPermissionList(userId) {
    dispatcher.dispatch({
        actionType: constants.GET_PERMISSION_LIST_START
    });

    Promise
        .all(
            permissionResource.getActivePermissions(userId),
            permissionResource.getPassivePermissions(userId)
        )
        .then((activePermissions, passivePermissions) => {
            dispatcher.dispatch({
                actionType: constants.GET_PERMISSION_LIST_END,
                data: {
                    activePermissions: activePermissions,
                    passivePermissions: passivePermissions
                }
            });
        })
}


export default { get, update, shareTo, getPermissionList };
