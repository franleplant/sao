//DEPRECATED!

import loginActions from './actions/loginActions.js';
import Firebase from 'firebase';
var ref = new Firebase("https://<your-firebase>.firebaseio.com/");

export default {
    login: (username, password) => {

        ref.authWithPassword({

            email    : username,
            password : password

        }, function(error, authData) {
            debugger;
            if (error) {
                console.log("Login Failed!", error);
                loginActions.loginFail(error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                loginActions.login(authData);
            }
        });

    },

    // This works!
    logout: () => {
        ref.unauth();
        loginActions.logout();
    },

    signup: () => {

    }
}
