
import _, {map, values, findKey} from 'lodash';
import Promise from 'bluebird';
import Firebase from 'firebase';

var OSref = new Firebase('https://luminous-fire-4753.firebaseio.com/OS');


var _osHash;
var _namesCache;

var checkThatOSAreLoaded = () => {
    if (!_osHash) throw new Error('OSUtils: The OSs have not been loaded yet').stack;
}


class OSUtils {
    constructor() {
        // Everything needs to wait for this before doing something
        // with the rest of the methods
        this.promise = new Promise((resolve, reject) => {
            // Load the OS list
            OSref.on('value', (snapshot) => {
                _osHash = snapshot.val();
                resolve(_osHash);

            })
        })
    }

    getOSList() {
        checkThatOSAreLoaded();
        return _osHash;
    }

    getNames() {
        checkThatOSAreLoaded();
        _namesCache = _namesCache || map(values(_osHash), 'name');
        return _namesCache;
    }

    getIdByName(name) {
        checkThatOSAreLoaded();
        return findKey(_osHash, 'name', name);
    }

    getNameById(id) {
        checkThatOSAreLoaded();
        return _osHash[id].name;
    }

    isValidName(name) {
        checkThatOSAreLoaded();
        return this.getNames().indexOf(name) !== -1;
    }
}

export default new OSUtils;
