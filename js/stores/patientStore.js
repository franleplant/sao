import copy from 'deepcopy';
import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import { patient as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';
const emitter = new EventEmitter();


let _state = {
    meta: {},
    odontogramTeethState: {}
};

function onChange(fn) {
    emitter.on(CHANGE_EVENT, fn);
}

function removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
}

/**
 * @description
 * Returns the state of the store that contains
 * the selected patient and the patient id
 *
 * @return {object} _state
 * @return {object} _state.patient
 * @return {string} _state.patient.patientId
 *
 */
function getState() {
    //Return a copy of the state to avoid unwanted modification, 
    //
    // remeber that javascript only passes object as references trough
    // functions
    return copy(_state);
}


let patientStore = { getState, onChange, removeChangeListener };


function persistData(patient) {
    Object.assign(_state, patient)
    emitter.emit(CHANGE_EVENT);
    return _state;
}

// Main dispatcher
patientStore.dispatchToken = dispatcher.register((payload) => {
    switch (payload.actionType) {
        case constants.SET:
            persistData(payload.data)
            break;

        default:
            break;
    }
});


export default patientStore;
