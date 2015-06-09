import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import moment from 'moment';
import copy from 'deepcopy';
import { care as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';
const emitter = new EventEmitter();

let _default_state = {
    meta: {},
    care: {
        selectedDate: moment().format('YYYY-MM-DD'),
        files: [],
        selectedPatient: {},
        notes: ''
    },
    careId: null
};

let _state = copy(_default_state);

function onChange(fn) {
    emitter.on(CHANGE_EVENT, fn);
}

function removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
}

function getState() {
    return copy(_state);
}


let careStore = { getState, onChange, removeChangeListener };


function persistData(care) {
    Object.assign(_state, care)
    emitter.emit(CHANGE_EVENT);
    return _state;
}

// Main dispatcher
careStore.dispatchToken = dispatcher.register((payload) => {

    switch (payload.actionType) {
        case constants.GET:
            _state.meta = {};
            persistData(payload.data)
            break;
        case constants.CREATE:
            _state.meta = {};
            persistData(payload.data)
            break;
        case constants.UPDATE:
            _state.meta = {};
            persistData(payload.data)
            break;
        case constants.REMOVE:
            _state = copy(_default_state);
            _state.meta = {
                    justRemoved: true
                }

            emitter.emit(CHANGE_EVENT);
            break;

        case constants.CLEAN:
            _state = copy(_default_state);

            emitter.emit(CHANGE_EVENT);
            break;

        default:
            break;
    }
});


export default careStore;
