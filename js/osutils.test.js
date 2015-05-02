import test from 'tape';
import {setOsList, getOsList, names, idByName, isValidName} from './osutils.js';

var osHashMock = {
    'a': {name: 'os1'},
    'b': {name: 'os2'},
    'c': {name: 'os3'}
}

test('osutils.js: setOsList', function (t) {
    t.plan(1);

    t.equal(typeof setOsList, 'function');
    setOsList(osHashMock);
});


test('osutils.js: getOsList', function (t) {
    t.plan(2);

    t.equal(typeof getOsList, 'function');
    t.equal(getOsList(), osHashMock);
});

test('osutils.js: names', function (t) {
    t.plan(4);

    t.equal(typeof names, 'function');
    var result = names();
    t.ok(result.indexOf('os1') !== -1);
    t.ok(result.indexOf('os2') !== -1);
    t.ok(result.indexOf('os3') !== -1);
});


test('osutils.js: idByName', function (t) {
    t.plan(2);

    t.equal(typeof idByName, 'function');
    t.equal(idByName('os2'), 'b');
});

test('osutils.js: isValidName', function (t) {
    t.plan(3);

    t.equal(typeof isValidName, 'function');
    t.ok(isValidName('os2'));
    t.ok(!isValidName());
});


