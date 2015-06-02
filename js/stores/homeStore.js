import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import { home as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';

const emitter = new EventEmitter();

let _state = {
    date: new Date(),
    meta: {}
};

function onChange(fn) {
    emitter.on(CHANGE_EVENT, fn);
}

function removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
}

function getState() {
    return _state;
}


let homeStore = { getState, onChange, removeChangeListener };

// Main dispatcher handler
homeStore.dispatchToken = dispatcher.register((payload) => {
    switch (payload.actionType) {
        case constants.SELECT_DATE:
            _state.date = payload.data.date
            emitter.emit(CHANGE_EVENT);
            break;
        default:
            break;
    }
});


export default homeStore;
