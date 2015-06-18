import dispatcher from '../dispatcher/AppDispatcher.js';
import { informationDomain as constants } from '../constants/actionTypes.js';
import router from '../router.js';


export default { set };

function set(userId, userEmail) {
    router.transitionTo('/');
    router.refresh();
    dispatcher.dispatch({
        actionType: constants.SET_INFORMATION_DOMAIN,
        data: { userId, userEmail }
    });
}
