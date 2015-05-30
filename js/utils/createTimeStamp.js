import sessionStore from '../stores/sessionStore.js';

export default function createTimeStamp() {
    return (new Date()).toUTCString()  + ' por ' + sessionStore.getUsername();
}
