require('es5-shim');

var proxyquire = require('proxyquireify')(require);


var assert = require("assert")
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

//var PatientForm = require('./PatientForm.react.js')
var PatientForm = proxyquire('./PatientForm.react.js', {
    // If one does not do this then react will start throwing the follwing error:
    // Error: Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs.
    // It look like the React reference inside proxyrequire might be different to one used inside
    // this test and that might be causing the problem so when you "mock" the react dependency
    // with the react reference used in the test it starts working, dont ask me more details
    // because this was solve by trial and error
    'react/addons': React,
    '../../osutils.js': {
        getNames: () => ['Buenos Aires', 'La Pampa']
    }
});

describe('Patient Form', function(){
    it('should return render the component', function(){
        var component = TestUtils.renderIntoDocument(<PatientForm/>);
        assert.ok(component, 'component should be rendered');
    })
})
