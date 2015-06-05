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
    CLEAN: Symbol('patient_clean')
}
