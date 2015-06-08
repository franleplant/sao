import dispatcher from '../dispatcher/AppDispatcher.js';
import { care as constants } from '../constants/actionTypes.js';
import patientActions from './patientActions.js';
import careResource from '../careResource.js';

function get(careId) {
    careResource
        .getById(careId)
        .catch((reason) => {
            alert('El registro de atencion seleccionado no existe');
            throw reason;
        })
        .then((care) => {
            dispatcher.dispatch({
                actionType: constants.GET,
                data: {
                    care: care,
                    odontogramData: care.selectedPatient.odontogramData,
                    careId: careId
                }
            });

            patientActions.set(care.selectedPatientId, care.selectedPatient);

        })
}

function create(care, odontogramData) {
    careResource
        .create(care, odontogramData)
        .catch((reason) => {
            alert('Ha habido un problema al registrar la antencion, por favor volve a intentar');
            throw reason;
        })
        .then((id) => {
            dispatcher.dispatch({
                actionType: constants.CREATE,
                data: {
                    careId: id,
                    care: care,
                    meta: {
                        justCreated: true
                    }
                }
            });
        })
}

function update(careId, care, odontogramData) {
    careResource
        .update(careId, care, odontogramData)
        .catch((reason) => {
            alert('Ha habido un problema al editar el registro de atencion');
            throw reason;
        })
        .then((id) => {
            dispatcher.dispatch({
                actionType: constants.UPDATE,
                data: {
                    careId: id,
                    care: care,
                    odontogramData: odontogramData,
                    meta: {
                        justUpdated: true
                    }
                }
            });
        })
}

function remove(careId) {
    careResource
        .remove(careId)
        .catch((error) => {
            alert('Error al borrar consulta');
            throw error;
        })
        .then(() => {
            alert('Consulta borrada con exito');

            dispatcher.dispatch({
                actionType: constants.REMOVE
            });

            patientActions.clean();
        });
}

export default { get, create, update, remove};
