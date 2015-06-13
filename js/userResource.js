import sessionStore from './stores/sessionStore.js';
import Firebase from 'firebase';
import Promise from 'bluebird';


const FIREBASE_URL = 'https://luminous-fire-4753.firebaseio.com/users';
const ref = new Firebase(FIREBASE_URL);


export default { getRef, getById, getByEmail };

function getRef() {
    var userId = sessionStore.getUserId();
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


