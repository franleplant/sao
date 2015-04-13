import loginActions from './actions/loginActions.js';

export default {
    login: (username, password) => {
        // In here there should the logic that validates
        // the user credentials against the server
        loginActions.login(username)
    },

    logout: () => {

    },

    signup: () => {

    }
}
