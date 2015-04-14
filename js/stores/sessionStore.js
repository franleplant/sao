import { EventEmitter } from 'events';
import {LOGIN, LOGOUT, SIGNUP} from '../constants/actionTypes.js';
import dispatcher from '../dispatcher/AppDispatcher.js';

var emitter = new EventEmitter();
var CHANGE_EVENT = 'change';

var username;

class SessionStore {
    constructor() {
        //Input
        // Save the dispatch order
        this.dispatchToken = dispatcher.register((action) => {
            switch (action.type) {
                case LOGIN:
                    username = action.username;
                    this.emitChange();
                    break;

                default:
                    //do nothing
            }
        })
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

    isLoggedIn() {
        return !!username;
    }
}

export default new SessionStore();
