import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import moment from 'moment';
import copy from 'deepcopy';
import { user as constants } from '../constants/actionTypes.js';

const CHANGE_EVENT = 'change';
const emitter = new EventEmitter();

let _default_state = {
    activePermissions: [],
    passivePermissions: [],
    meta: {
        loading: false
    }
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


let sharePermissionStore = { getState, onChange, removeChangeListener };


function persistData(sharePermission) {
    Object.assign(_state, sharePermission)
    emitter.emit(CHANGE_EVENT);
    return _state;
}

// Main dispatcher
sharePermissionStore.dispatchToken = dispatcher.register((payload) => {

    switch (payload.actionType) {
        case constants.SHARE_TO_START:
            _state.meta.loading = true;
            _state.meta.error = undefined;
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.SHARE_TO_END:
            _state.meta.loading = false;
            _state.activePermissions.push(payload.data.permission)
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.SHARE_TO_ERROR_USER_NOT_FOUND:
            _state.meta.loading = false;
            _state.meta.error = 404;
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.SHARE_TO_ERROR_DUPLICATED_PASSIVE_USER:
            _state.meta.loading = false;
            // Not acceptable
            _state.meta.error = 406;
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.GET_PERMISSION_LIST_START:
            _state.meta.loading = true;
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.GET_PERMISSION_LIST_END:
            _state.meta.loading = false;
            persistData(payload.data);
            break;

        case constants.REMOVE_ACTIVE_PERMISSION_START:
            _state.meta.loading = true;
            emitter.emit(CHANGE_EVENT);
            break;

        case constants.REMOVE_ACTIVE_PERMISSION_END:
            _state.meta.loading = false;
            let permissionId = payload.data.permissionId;
            //remove from the active permission array the one that has been deleted
            _state.activePermissions =
                _state.activePermissions
                .filter((permission, index) => {
                    return permission.permissionId !== permissionId
                })
            emitter.emit(CHANGE_EVENT);
            break;

        default:
            break;
    }
});


export default sharePermissionStore;
