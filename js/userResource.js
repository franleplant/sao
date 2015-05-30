import sessionStore from './stores/sessionStore.js';
import Firebase from 'firebase';
import Promise from 'bluebird';


const FIREBASE_URL = 'https://luminous-fire-4753.firebaseio.com/users';

function getRef() {
    var userId = sessionStore.getUserId();
    if (!userId) {
        throw new Error('patientResource: userID is undefined in the session store').stack;
    }

    return new Firebase(FIREBASE_URL)
                .child(userId);
}

export default { getRef }
