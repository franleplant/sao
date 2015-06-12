import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import copy from 'deepcopy';
import { user as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';
const emitter = new EventEmitter();

let _default_state = {
    meta: {},
    user: {},
    loading: true,
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


let userStore = { getState, onChange, removeChangeListener };



// Main dispatcher
userStore.dispatchToken = dispatcher.register((payload) => {

    switch (payload.actionType) {
        case constants.SET:
            _state = payload.data;
            _state.loading = false;
            emitter.emit(CHANGE_EVENT);
            break;
        case constants.UPDATE:
            _state = payload.data;
            _state.loading = false;
            emitter.emit(CHANGE_EVENT);
            break;

        default:
            break;
    }
});


export default userStore;
