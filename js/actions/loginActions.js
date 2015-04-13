import dispatcher from '../dispatcher/AppDispatcher.js';
import {LOGIN, LOGOUT, SIGNUP} from '../constants/actionTypes.js';
import router from '../router.js';


export default {
    login: (username) => {
        // move to the home
        router.transitionTo('/');

        console.log('actions!')
        dispatcher.dispatch({
            type: LOGIN,
            username: username
        })
    },
    logout: () => {},
    signup: () => {}
}
