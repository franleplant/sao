import {provinces, locByProvince, postalByLoc} from './argutils.js';

describe('argutils', function () {
    describe('provinces', function() {
        it('should return an array of provinces', function() {
            expect(Array.isArray(provinces)).toBeTruthy();
            expect(provinces.length).toBeTruthy();
            expect(typeof provinces[0]).toBe('string');
        });
    });

    describe('locByProvince', function() {
        it('should return an array of all localities inside a province', function() {
            expect(typeof locByProvince).toBe('function');

            var result = locByProvince(provinces[0]);

            expect( Array.isArray(result) ).toBeTruthy();
            expect(result.length).toBeTruthy();
            expect(typeof result[0]).toBe('string');
        });
    });

    describe('postalByLoc', function() {
        it('should return the postal code of given loc', function() {
            expect(postalByLoc('Zanjon Del Pescado')).toBe(9015);
        });
    });
});
