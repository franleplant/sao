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
            authData: authData
        })
    },

    logout: () => {
        ref.unauth();
        router.transitionTo('/login');
        dispatcher.dispatch({
            type: constants.LOGOUT
        })
    },
    signup: () => {}
}
