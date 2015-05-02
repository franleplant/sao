/**
 * @description
 * The main purpose of this little script is to
 * get all the test files and run then, you can
 * think of it as a test harness.
 * It is used by the `npm test` script
 */

var path = require('path');
var glob = require('glob');

var pattern = './js/**/*.test.js';

glob(pattern, function (err, files) {
    files.forEach(function (file) {
      require(path.resolve(process.cwd(), file));
    });
});

