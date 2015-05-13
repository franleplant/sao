var proxyquire = require('proxyquireify')(require);

var osHashMock = {
    'a': {name: 'os1'},
    'b': {name: 'os2'},
    'c': {name: 'os3'}
};

class firebaseMock {
    constructor() {}

    on(event, callback) {
        var snapshotMock = {
            val: () => osHashMock
        }
        callback(snapshotMock);
    }
}

// Require the test subject with the mocked dependencies :)
var osutils = proxyquire('./osutils.js', { firebase: firebaseMock});



describe('osutils', function() {

    describe('getOSList', function() {
        it('should return the osHask', function(done) {
            osutils.promise.then(function(osHash) {
                expect(osHash).toEqual(osHashMock);
                expect(osutils.getOSList()).toEqual(osHashMock);
            })
            .finally(done)
        })
    });

    describe('getNames', function () {
        it('should return a names array', function(done) {
            osutils.promise.then(function(osHash) {
                var result = osutils.getNames();
                expect(result.indexOf('os1') !== -1).toBeTruthy();
                expect(result.indexOf('os2') !== -1).toBeTruthy();
                expect(result.indexOf('os3') !== -1).toBeTruthy();
            })
            .finally(done)
        })
    });


    describe('getIdByName', function() {
        it('should return the id of the given os name', function(done) {
            osutils.promise.then(function(osHash) {
                expect(osutils.getIdByName('os2')).toBe('b');
            })
            .finally(done)
        })
    });

    describe('isValidName', function() {
        it('should return true if the given os name is present in the osHash', function(done) {
            osutils.promise.then(function(osHash) {
                expect(osutils.isValidName('os2')).toBeTruthy();
                expect(osutils.isValidName('not an os')).toBeFalsy();
                expect(osutils.isValidName()).toBeFalsy();
            })
            .finally(done)
        })
    });
})
