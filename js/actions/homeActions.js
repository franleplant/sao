import dispatcher from '../dispatcher/AppDispatcher.js';
import { home as constants } from '../constants/actionTypes.js';

function selectDate(date) {
    dispatcher.dispatch({
        actionType: constants.SELECT_DATE,
        data: { date }
    });
}

export default { selectDate };
