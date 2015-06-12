import dispatcher from '../dispatcher/AppDispatcher.js';
import { user as constants } from '../constants/actionTypes.js';
import userResource from '../userResource.js';


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


export default { get, update };
