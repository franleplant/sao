import test from 'tape';
import {setOsList, getOsList, names, idByName, isValidName} from './osutils.js';

var osHashMock = {
    'a': {name: 'os1'},
    'b': {name: 'os2'},
    'c': {name: 'os3'}
}

describe('osutils', function() {
    beforeEach(function() {
        setOsList(osHashMock);
    })

    describe('setOsList', function () {
        it('should be a function', function() {
            expect(typeof setOsList).toBe('function');
        })
    });


    describe('getOsList', function() {
        it('should return the osHask', function() {
            expect(typeof getOsList).toBe('function');
            expect(getOsList()).toEqual(osHashMock);
        })
    });

    describe('names', function () {
        it('should return a names array', function() {
            expect(typeof names).toBe('function');
            var result = names();
            expect(result.indexOf('os1') !== -1).toBeTruthy();
            expect(result.indexOf('os2') !== -1).toBeTruthy();
            expect(result.indexOf('os3') !== -1).toBeTruthy();
        })
    });

})

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


