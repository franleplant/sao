import dispatcher from '../dispatcher/AppDispatcher.js';
import { patient as constants } from '../constants/actionTypes.js';
import patientResource from '../patientResource.js';


function get(patientId) {
    patientResource
        .getById(patientId)
        .catch(console.log.bind(console))
        .then((patient) => {

            patient.patientId = patientId;

            dispatcher.dispatch({
                actionType: constants.SET,
                data: patient
            });

        })
}

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

export default { set, get, clean };
