import Firebase from 'firebase';
import Promise from 'bluebird';
import sessionStore from './stores/sessionStore.js';
import informationDomainStore from './stores/informationDomainStore.js';


const FIREBASE_URL = 'https://luminous-fire-4753.firebaseio.com/users';
const ref = new Firebase(FIREBASE_URL);


export default { getRef, getById, getByEmail };

/**
 * @description
 * Get the firebase ref for the currently selected DI
 */
function getRef() {
    var userId = informationDomainStore.getState().userId;
    if (!userId) {
        throw new Error('patientResource: userID is undefined in the session store').stack;
    }

    return new Firebase(FIREBASE_URL)
                .child(userId);
}

function getById(userId) {
    return new Promise((resolve, reject) => {
        ref
            .child(userId)
            .once('value', (snapshot) => {
                let user = snapshot.val();
                user.userId = snapshot.key();


                if (!user) {
                    reject('user not found');
                    return;
                }

                resolve(user);

            })
    })
}


function getByEmail(userEmail) {
    return new Promise((resolve, reject) => {
        ref
            .orderByChild('email')
            .equalTo(userEmail)
            .once('value', (snapshot) => {
                var result = snapshot.val();

                if (!result) {
                    reject('user not found');
                    return;
                }

                Object.keys(result)
                    .forEach((key) => {
                        //since email are supposed to be unique
                        //keys then this result should be a single entity
                        let user = result[key];
                        user.userId = key;
                        resolve(user);
                    })

            })
    })
}


