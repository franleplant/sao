import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/AppDispatcher.js';
import constants from '../constants/actionTypes.js';
import appointmentResource from '../appointmentResource.js';

const emitter = new EventEmitter();
const CHANGE_EVENT = 'change';


var _appointmentList = [];

class AppointmentListStore {
    constructor() {
        // Save the dispatch order
        this.dispatchToken = dispatcher.register((action) => {
            switch (action.type) {
                case constants.GET_DAILY_DATA:
                    this.getData(action.date)
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

    getData(date) {
        appointmentResource
            .getByDate(date)
            .catch(console.log.bind(console))
            .then((appointmentList) => {
                _appointmentList = appointmentList;
                this.emitChange();
            });
    }

    getAppointmentList() {
        return _appointmentList;
    }

    removeChangeListener(callback) {
        emitter.removeListener(CHANGE_EVENT, callback);
    }
}

export default new AppointmentListStore();
