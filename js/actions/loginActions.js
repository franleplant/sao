import dispatcher from '../dispatcher/AppDispatcher.js';
import constants from '../constants/actionTypes.js';
import router from '../router.js';
import Firebase from 'firebase';

var ref = new Firebase('https://luminous-fire-4753.firebaseio.com/');

export default {
    login: (authData) => {
        // move to the home
        router.transitionTo('/');
        dispatcher.dispatch({
            type: constants.LOGIN,
            // Duplicate action type to add compatibility with improved store patterns
            actionType: constants.LOGIN,
            authData: authData
        })
    },

    logout: () => {
        router.transitionTo('/login');
        ref.unauth();
        dispatcher.dispatch({
            type: constants.LOGOUT
        })
    },


    signup: (user) => {
        ref.createUser({
            email    : user.email,
            password : user.password
         }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
            } else {
                console.log("Successfully created user account with uid:", userData.uid);

                // Do not store user passwords with user data
                delete user.password;

                ref
                    .child("users")
                    .child(userData.uid)
                    .set(user, (error) => {
                        if (error) {
                            console.log('cant save user data, but user was created successfully')
                        }

                        // When everythin goes fine then redirect to the login page
                        router.transitionTo('/login');
                        dispatcher.dispatch({
                            type: constants.SINGUP
                        })
                    });
            }
        });
    }
}
