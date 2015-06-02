import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import { appointment as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';

const emitter = new EventEmitter();

let _state = { meta: {} };

function onChange(fn) {
    emitter.on(CHANGE_EVENT, fn);
}

function removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
}

function getState() {
    return _state;
}


let appointmentStore = { getState, onChange, removeChangeListener };


function persistData(appointment) {
    Object.assign(_state, appointment)
    emitter.emit(CHANGE_EVENT);
    return _state;
}

// Main dispatcher
appointmentStore.dispatchToken = dispatcher.register((payload) => {

    switch (payload.actionType) {
        case constants.GET:
            payload.data.meta = {}

            persistData(payload.data)
            break;
        case constants.CREATE:

            payload.data.meta = {
                justCreated: true
            };

            persistData(payload.data)
            break;
        case constants.UPDATE:
            payload.data.meta = {
                justUpdated: true
            };


            persistData(payload.data)
            break;
        case constants.REMOVE:
            _state = {
                meta: {
                    justRemoved: true
                }
            }

            emitter.emit(CHANGE_EVENT);
            break;

        default:
            break;
    }
});


export default appointmentStore;
