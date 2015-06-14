import keyMirror from 'keymirror';
import Symbol from 'es6-symbol';

export default keyMirror({
    SIGNUP: null,
    LOGIN: null,
    LOGOUT: null,
    GET_DAILY_DATA: null
});

export var appointment = {
    GET: Symbol('appointment_get'),
    CREATE: Symbol('appointment_create'),
    UPDATE: Symbol('appointment_update'),
    REMOVE: Symbol('appointment_remove')
}


export var home = {
    SELECT_DATE: Symbol('home selected date')
}

export let patient = {
    SET: Symbol('patient_set'),
    CLEAN: Symbol('patient_clean'),
    CREATE: Symbol('patient_create'),
    UPDATE: Symbol('patient_update'),
    REMOVE: Symbol('patient_remove')
}



export let care = {
    GET: Symbol('care_get'),
    CLEAN: Symbol('care_clean'),
    CREATE: Symbol('care_create'),
    UPDATE: Symbol('care_update'),
    REMOVE: Symbol('care_remove')
}


export let user = {
    SET: Symbol('user_set'),
    UPDATE: Symbol('user_update'),
    SHARE_TO_START: Symbol('user_share_to_start'),
    SHARE_TO_END: Symbol('user_share_to_end'),
    SHARE_TO_ERROR_USER_NOT_FOUND: Symbol('user_share_to_error: user not found'),
    GET_PERMISSION_LIST_START: Symbol('user_get_permission_list_start'),
    GET_PERMISSION_LIST_END: Symbol('user_get_permission_list_end'),
    SHARE_TO_ERROR_DUPLICATED_PASSIVE_USER: Symbol('user share to error duplicated passive user'),
    REMOVE_ACTIVE_PERMISSION_START: Symbol('user: remove active permission start'),
    REMOVE_ACTIVE_PERMISSION_END: Symbol('user: remove active permission end')
}
