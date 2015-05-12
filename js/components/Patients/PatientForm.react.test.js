var assert = require("assert")
var PatientForm = require('./PatientForm.react.js');
var TestUtils = require('react/addons').addons.TestUtils;
var React = require('react/addons');

describe('Patient Form', function(){
    it('should return render the component', function(){
        var component = TestUtils.renderIntoDocument(<PatientForm/>);
        assert.ok(component, 'component should be rendered');
    })
})
