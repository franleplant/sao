// pollyfilling phantom
require('es5-shim');

require('../js/components/Patients/PatientForm.react.test.js');

if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  window.mocha.run();
}
