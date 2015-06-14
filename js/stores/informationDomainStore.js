import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import copy from 'deepcopy';
import otherConstants, { informationDomain as constants }  from '../constants/actionTypes.js';
import sessionStore from './sessionStore.js';

const CHANGE_EVENT = 'change';
const emitter = new EventEmitter();

let _default_state = {
    userEmail: sessionStore.getUsername(),
    userId: sessionStore.getId()
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


let informationDomainStore = { getState, onChange, removeChangeListener };


// Main dispatcher
informationDomainStore.dispatchToken = dispatcher.register((payload) => {

    switch (payload.actionType) {
        case otherConstants.LOGIN:
        // Perhaps if we used the waitFor for the sessionStorage to resolve and
        // then just get the data from the sessionStore it will be more clean
            _state = {
                userEmail: payload.authData.password.email,
                userId: payload.authData.uid
            }
            emitter.emit(CHANGE_EVENT);
            break;
        case constants.SET_INFORMATION_DOMAIN:
            _state = {
                userEmail: payload.data.userEmail,
                userId: payload.data.userId
            }
            emitter.emit(CHANGE_EVENT);
            break;

        default:
            break;
    }
});


export default informationDomainStore;
