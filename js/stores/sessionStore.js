import { EventEmitter } from 'events';
import {LOGIN, LOGOUT, SIGNUP} from '../constants/actionTypes.js';
import dispatcher from '../dispatcher/AppDispatcher.js';

var emitter = new EventEmitter();
var CHANGE_EVENT = 'change';

var username;

// TODO: tidy up the constructor
class SessionStore {
    constructor() {
        if (localStorage) {
            var auth = JSON.parse(localStorage.getItem('firebase:session::luminous-fire-4753'));
            if (auth) {
                username = auth.password.email;
            }
        }

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

    isLoggedIn() {
        return !!username;
    }
}

export default new SessionStore();
