import { EventEmitter } from 'events';
import constants from '../constants/actionTypes.js';
import dispatcher from '../dispatcher/AppDispatcher.js';

var emitter = new EventEmitter();
var CHANGE_EVENT = 'change';
const FIREBASE_KEY = 'firebase:session::luminous-fire-4753'

var username;
var id;

// TODO: tidy up the constructor
class SessionStore {
    constructor() {
        if (localStorage) {
            var auth = JSON.parse(localStorage.getItem(FIREBASE_KEY));
            if (auth) {
                username = auth.password.email;
                id = auth.uid;
            }
        }

        //Input
        // Save the dispatch order
        this.dispatchToken = dispatcher.register((action) => {
            switch (action.type) {
                case constants.LOGIN:
                    username = action.authData.password.email;
                    id = action.authData.uid;
                    this.emitChange();
                    break;

                case constants.LOGOUT:
                    username = id = undefined;
                    try {
                        // Clean up the localstorage entry
                        localStorage.removeItem(FIREBASE_KEY)
                    }
                    catch(e) {

                    }
                    this.emitChange();
                    break;

                default:
                    //do nothing
            }
        });
    }

    //Output
    emitChange() {
        emitter.emit(CHANGE_EVENT)
    }

    onChange(fn) {
        emitter.on(CHANGE_EVENT, fn);
    }

    getUsername () {
        return username;
    }

    getUserId() {
        return id
    }

    getId() {
        return id
    }

    isLoggedIn() {
        return !!username;
    }
}

export default new SessionStore();
