import dispatcher from '../dispatcher/AppDispatcher.js';
import { patient as constants } from '../constants/actionTypes.js';

function set(patientId, patient) {
    patient.patientId = patientId;

    dispatcher.dispatch({
        actionType: constants.SET,
        data: patient
    });
}

/**
 * @description
 * Clean the selected patient inside the store
 */
function clean() {
    dispatcher.dispatch({
        actionType: constants.CLEAN
    });
}

export default { set, clean };
