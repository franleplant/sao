import dispatcher from '../dispatcher/AppDispatcher.js';
import constants from '../constants/actionTypes.js';

export default {
    getDailyData: (date) => {
        dispatcher.dispatch({
            type: constants.GET_DAILY_DATA,
            date: date
        })
    }
}
