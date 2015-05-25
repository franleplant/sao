import dispatcher from '../dispatcher/AppDispatcher.js';
import {LOGIN, LOGOUT, SIGNUP} from '../constants/actionTypes.js';
import router from '../router.js';


export default {
    login: (authData) => {
        // move to the home
        router.transitionTo('/');
        dispatcher.dispatch({
            type: LOGIN,
            authData: authData
        })
    },

    logout: () => {
        router.transitionTo('/login');
    },
    signup: () => {}
}
