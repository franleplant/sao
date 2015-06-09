import Promise from 'bluebird';
import userResource from './userResource.js';
import patientResource from './patientResource.js';
import createTimeStamp from './utils/createTimeStamp.js';
import _ from 'lodash';


const FIREBASE_CHILD_KEY = 'cares';


function getRef() {
    return userResource
            .getRef()
            .child(FIREBASE_CHILD_KEY);
}

/**
 * @description
 * Get a care by Id
 */
function getById(careId) {
    return new Promise((resolve, reject) => {
        getRef()
            .child(careId)
            .once('value', (snapshot) => {
                    var care = snapshot.val();
                    if (!care) {
                        reject('care not found');
                        return;
                    };

                    patientResource
                        .getById(care.selectedPatientId)
                        .then((patient) => {
                            care.selectedPatient = patient;
                            resolve(care);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });

            }, (error) => {
                reject(error);
            })
    })
}


function getAllByPatientId(patientId) {
    return new Promise((resolve, reject) => {
        getRef()
            .orderByChild('selectedPatientId')
            .equalTo(patientId)
            .once('value', (snapshot) => {
                    var cares = snapshot.val();
                    if (!cares) {
                        reject('cares not found');
                        return;
                    };

                    resolve(cares);

            }, (error) => {
                reject(error);
            })
    })
}


function create(care, odontogramData) {
    care.auditCreated = createTimeStamp();

    return new Promise((resolve, reject) => {
        var newCare = getRef()
                        .push(care, (error) => {
                            if (error) {
                                reject(error);
                                return;
                            }

                            //hackish trick to have access to the newCare Id
                            setTimeout(() => {
                                resolve(newCare.key(), care);
                            })
                        })
    })
    .then((careId) => {
        return patientResource
                    .updateOdontogram(care.selectedPatientId, odontogramData).
                    catch((reason) => {
                        alert('Ha habido un error al guardar el Odontograma')
                        throw reason;
                    })
                    .then((odontogramData) => {
                        alert('La atencion ha sido registrada exitosamente.')
                        return careId;
                    })

    })
}


function update(careId, care, odontogramData) {
    care.auditEdited =  createTimeStamp();

    return new Promise((resolve, reject) => {
                getRef()
                .child(careId)
                .update(care, (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(careId);
                });
    })
    .then((careId) => {
        return patientResource
                    .updateOdontogram(care.selectedPatientId, odontogramData).
                    catch((reason) => {
                        alert('Ha habido un error al guardar el Odontograma')
                        throw reason;
                    })
                    .then((odontogramData) => {
                        alert('La atencion ha sido registrada exitosamente.')
                        return careId;
                    })

    })
}


function remove(careId) {
    return new Promise((resolve, reject) => {
        getRef()
            .child(careId)
            .remove((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve()
            });
    });
}

export default {getRef, getById, getAllByPatientId, create, update, remove};
