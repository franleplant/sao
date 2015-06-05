import dispatcher from '../dispatcher/AppDispatcher.js';
import { patient as constants } from '../constants/actionTypes.js';

function set(patientId, patient) {
    patient.patientId = patientId;

    dispatcher.dispatch({
        actionType: constants.SET,
        data: patient
    });
}

export default { set };
