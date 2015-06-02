import dispatcher from '../dispatcher/AppDispatcher.js';
import { appointment as constants } from '../constants/actionTypes.js';
import appointmentResource from '../appointmentResource.js';

function get(appointmentId) {
    // TODO: according to flux/react standard we should trigger a loading action
    // at this point and let the stores and then the UI respond accordingly
    appointmentResource
        .getById(appointmentId)
        .catch((reason) => {
            // TODO: according to flux/react standards we should generate an error action,
            // update the store accordingly and let the UI respond to that
            alert('El turno seleccionado no existe');
            throw reason;
        })
        .then((appointment) => {
            dispatcher.dispatch({
                actionType: constants.GET,
                data: appointment
            });

        })
}

function create(appointment) {
    // TODO: create an action
    appointmentResource
        .create(appointment)
        .catch((reason) => {
            // TODO: create an action
            alert('Ha habido un problema al crear el turno, por favor volve a intentar');
            throw reason;
        })
        .then((id) => {
            alert('El turno ha sido creado exitosamente!');
            dispatcher.dispatch({
                actionType: constants.CREATE,
                data: {
                    appointmentId: id,
                    meta: {
                        justCreated: true
                    }
                }
            });
        })
}

function update(appointmentId, appointment) {
    appointmentResource
        .update(appointmentId, appointment)
        .catch((reason) => {
            alert('Ha habido un problema al editar el turno');
            throw reason;
        })
        .then((id) => {
            alert('El turno ha sido editado exitosamente')

            // Update the UI with the last edited date
            dispatcher.dispatch({
                actionType: constants.UPDATE,
                data: appointment
            });
        })
}

function remove(appointmentId) {
    appointmentResource
        .remove(appointmentId)
        .catch((error) => {
            alert('Error al borrar turno');
            throw error;
        })
        .then(() => {
            alert('turno borrado con exito');

            dispatcher.dispatch({
                actionType: constants.REMOVE
            });
        });
}

export default { get, create, update, remove};
