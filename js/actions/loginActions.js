import dispatcher from '../dispatcher/AppDispatcher.js';
import constants from '../constants/actionTypes.js';
import router from '../router.js';


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
        router.transitionTo('/login');
        dispatcher.dispatch({
            type: constants.LOGOUT
        })
    },
    signup: () => {}
}
