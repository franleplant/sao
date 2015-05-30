import Promise from 'bluebird';
import userResource from './userResource.js';
import patientResource from './patientResource.js';
import createTimeStamp from './utils/createTimeStamp.js';


const FIREBASE_CHILD_KEY = 'appointments';


function getRef() {
    return userResource
            .getRef()
            .child(FIREBASE_CHILD_KEY);
}

/**
 * @description
 * Get an appointment by Id
 */
function getById(appointmentId) {
    return new Promise((resolve, reject) => {

        getRef()
            .child(appointmentId)
            .once('value', (snapshot) => {
                    var appointment = snapshot.val();
                    if (!appointment) {
                        reject('appointment not found');
                        return;
                    };

                    patientResource
                        .getById(appointment.selectedPatientId)
                        .then((patient) => {
                            appointment.selectedPatient = patient;
                            resolve(appointment);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });

            }, (error) => {
                reject(error);
            })
    })
}

function create(appointment) {
    appointment.auditCreated = createTimeStamp();

    return new Promise((resolve, reject) => {
        var newAppointment = getRef()
                                .push(appointment, (error) => {
                                        if (error) {
                                            reject(error);
                                            return;
                                        }

                                        //hackish trick to have access to the newPatientId
                                        setTimeout(() => {
                                            resolve(newAppointment.key(), appointment);
                                        }, 100)
                                    })
    })
}


function update(appointmentId, appointment) {
    appointment.auditEdited =  createTimeStamp();

    return new Promise((resolve, reject) => {
                getRef()
                .child(appointmentId)
                .update(appointment, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(appointmentId, appointment);
                });
    })
}


function remove(appointmentId) {
    return new Promise((resolve, reject) => {
        getRef()
            .child(this.props.appointmentId)
            .remove((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve()
            });
    });
}

export default {getRef, getById, create, update, remove}
