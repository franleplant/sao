import test from 'tape';
import {provinces, locByProvince, postalByLoc} from './argutils.js';

test('argutils:', function (t) {
    t.plan(8);

    // provinces
    t.ok(Array.isArray(provinces));
    t.ok(provinces.length);
    t.equal(typeof provinces[0], 'string');

    // byProvince
    t.equal(typeof locByProvince, 'function');

    var result = locByProvince(provinces[0]);
    t.ok( Array.isArray(result) );
    t.ok(result.length);
    t.equal(typeof result[0], 'string');

    // postalByLoc
    t.equal(postalByLoc('Zanjon Del Pescado'), 9015);
});
