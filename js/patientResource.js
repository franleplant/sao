import userResource from './userResource.js';
import Promise from 'bluebird';
import _ from 'lodash';
import osutils from './osutils.js';



const NAME_ATTR = 'name';
const DNI_ATTR = 'DNI';

function getRef() {
    return userResource.getRef()
            .child('patients');
}


function getSome() {
    return new Promise((resolve, reject) => {
        getRef()
            .limitToFirst(5)
            .once('value', (snapshot) => {
                var patients =  _.values(_.forOwn(snapshot.val(), (patient, patientId) => {
                    // Attach to each result patient its id
                    patient.patientId = patientId;
                    return patient;
                }));

                resolve(patients);
            }, (error)=> {
                reject(error);
            });
    });
}

function getById(patientId) {
    return new Promise((resolve, reject) => {
        getRef()
            .child(patientId)
            .once('value', (snapshot) => {
                var patient = snapshot.val();
                if (!patient) {
                    reject('patient not found');
                    return
                }

                patient.osName = osutils.getNameById(patient.osId);

                // TODO: resolve the OS by its id and attach it
                resolve(patient);

            }, (error) => {
                reject(error);
            })
    });
}



/**
 * @param {string} searchText
 * @param {object} patients - Patients hash with the form of `{patientID: patient}`
 */
function searchPatientsInHash(searchText, patients) {

    searchText = searchText.toUpperCase();

    // Basically iterate over each patient
    return _.values(_.forOwn(patients, (patient, patientId) => {
        // Attach to each result patient its id
        patient.patientId = patientId;
        return patient;
    }))
    .filter((patient) => {
        // Pretty basic string contain
        var name = patient[NAME_ATTR].toUpperCase();
        var DNI = patient[DNI_ATTR].toUpperCase();
        return (name.indexOf(searchText) !== -1) || (DNI.indexOf(searchText) !== -1);
    })
}

// This should return a promise
function search(searchText) {

    var patientsPromise =

        new Promise((resolve, reject) => {
            getRef().once('value', (snapshot) => {
                var patients = snapshot.val()

                if (!patients) {
                    reject('no results!');
                    return;
                }

                resolve(patients);
            });
        });


    return patientsPromise
                .then((patients) => {
                    var results = searchPatientsInHash(searchText, patients);
                    return results;
                });
}


export default { getRef, getById, getSome, search};
