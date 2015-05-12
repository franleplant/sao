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


    describe('idByName', function() {
        it('should return the id of the given os name', function() {
            expect(typeof idByName).toBe('function');
            expect(idByName('os2')).toBe('b');
        })
    });

    describe('isValidName', function() {
        it('should return true if the given os name is present in the osHash', function() {
            expect(typeof isValidName).toBe('function');
            expect(isValidName('os2')).toBeTruthy();
            expect(isValidName('not an os')).toBeFalsy();
            expect(isValidName()).toBeFalsy();
        })
    });
})
