import Firebase from 'firebase';
import Promise from 'bluebird';
import _ from 'lodash';
import userResource from './userResource.js';

const FIREBASE_URL = 'https://luminous-fire-4753.firebaseio.com';
const ref = new Firebase(FIREBASE_URL);

const PERMISSIONS_KEY = 'permissions';

export default { getActivePermissions, getPassivePermissions };

function getActivePermissions(activeUserId) {
    return new Promise((resolve, reject) => {
        ref
            .child(PERMISSIONS_KEY)
            .orderByChild('activeUser')
            .equalTo(activeUserId)
            .once('value', (snapshot) => {
                var users = [];

                let activePermissions = (
                        _.values(
                            _.forOwn(snapshot.val(), (permission, permissionId) => {
                                permission.permissionId = permissionId;
                            })
                        )
                        || []
                    )
                    .map((permission) => {
                        var userPromise = userResource
                                            .getById(permission.passiveUser)
                                            .then((passiveUser) => {
                                                permission.passiveUser = passiveUser;
                                            })
                        users.push(userPromise);

                        return permission;
                    })

                Promise
                    .all(users)
                    .then(() => {
                        resolve(activePermissions || [])
                    })

            })
    })
}

function getPassivePermissions(passiveUserId) {
    return new Promise((resolve, reject) => {
        ref
            .child(PERMISSIONS_KEY)
            .orderByChild('passiveUser')
            .equalTo(passiveUserId)
            .once('value', (snapshot) => {
                var users = [];

                let passivePermissions = (
                        _.values(
                            _.forOwn(snapshot.val(), (permission, permissionId) => {
                                // Save the ids for later
                                permission.permissionId = permissionId;
                            })
                        )
                        || []
                    )
                    .map((permission) => {
                        var userPromise = userResource
                                            .getById(permission.activeUser)
                                            .then((activeUser) => {
                                                permission.activeUser = activeUser;
                                            })
                        users.push(userPromise);

                        return permission;
                    })


                Promise
                    .all(users)
                    .then(() => {
                        resolve(passivePermissions || [])
                    })

            })
    })
}
