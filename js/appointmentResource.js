import Promise from 'bluebird';
import userResource from './userResource.js';
import patientResource from './patientResource.js';
import createTimeStamp from './utils/createTimeStamp.js';
import _ from 'lodash';


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

/**
 * @description
 * get all apppoinmtnets for a given date
 *
 * @param {string} date - with the format: "2015-05-30"
 */
function getByDate(date) {
     return new Promise((resolve, reject) => {

        getRef()
            .orderByChild("selectedDate")
            .equalTo(date)
            .once('value', (snapshot) => {

                var appointments =  _.values(_.forOwn(snapshot.val(), (appointment, appointmentId) => {
                    // Attach to each result appointment its id
                    appointment.appointmentId = appointmentId;
                    return appointment;
                }));


                var patientPromiseArray = []
                appointments.forEach((appointment) => {
                    var promise = patientResource
                                    .getById(appointment.selectedPatientId)
                                    .then((patient) => {
                                        appointment.selectedPatient = patient;
                                    });

                    patientPromiseArray.push(promise)
                })


                Promise.all(patientPromiseArray)
                    .catch((reason) => {
                        reject(reason);
                        console.log(reason)
                    })
                    .then(() => {
                        resolve(appointments);
                    })

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
            .child(appointmentId)
            .remove((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve()
            });
    });
}

export default {getRef, getById, getByDate, create, update, remove}
