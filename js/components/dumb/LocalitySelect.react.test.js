var proxyquire = require('proxyquireify')(require);

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var LocalitySelect = proxyquire('./LocalitySelect.react.js', {
    // If one does not do this then react will start throwing the follwing error:
    // Error: Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs.
    // It look like the React reference inside proxyrequire might be different to one used inside
    // this test and that might be causing the problem so when you "mock" the react dependency
    // with the react reference used in the test it starts working, dont ask me more details
    // because this was solve by trial and error
    'react/addons': React
});

xdescribe('LocalitySelect', function(){
    it('should return render two selects', function(){
        var component = TestUtils.renderIntoDocument(<LocalitySelect/>);
        expect(component).toBeTruthy();
        var selects = TestUtils.scryRenderedDOMComponentsWithTag(component, 'select');
        expect(selects.length).toBe(2);
    })
    it('should return render two selects and expose onChange', function(done){
        var eventValue;
        function onChangeHandler(event) {
            eventValue = event.target.value;
        }
        var component = TestUtils.renderIntoDocument(<LocalitySelect value={''} onChange={onChangeHandler}/>);
        var provinceSelect = component.refs.provinceSelect;
        var localitySelect = component.refs.localitySelect;

        var node = React.findDOMNode(component)
        TestUtils.Simulate.change(provinceSelect.getDOMNode(), { target: { value: 'Buenos Aires' } });


        // Need to wait a second for the locality option list to render
        setTimeout(function() {
            var localityOptions = localitySelect.getDOMNode().querySelectorAll('option');
            expect(localityOptions.length).toBeGreaterThan(10);

            var event = { target: { value: '2800__Campana' } };
            TestUtils.Simulate.change(localitySelect.getDOMNode(), event);
            expect(eventValue).toEqual(event.target.value)
            done()
        }, 1000)
    })


    it('should accept setting the value externally', function(done){
        var eventValue;
        function onChangeHandler(event) {
            eventValue = event.target.value;
        }
        var component = TestUtils.renderIntoDocument(<LocalitySelect value={'2800__Campana'} onChange={onChangeHandler}/>);
        var provinceSelect = component.refs.provinceSelect;
        var localitySelect = component.refs.localitySelect;

        //var node = React.findDOMNode(component)
        //TestUtils.Simulate.change(provinceSelect.getDOMNode(), { target: { value: 'Buenos Aires' } });


        //// Need to wait a second for the locality option list to render
        //setTimeout(function() {
            //var localityOptions = localitySelect.getDOMNode().querySelectorAll('option');
            //expect(localityOptions.length).toBeGreaterThan(10);

            //var event = { target: { value: '2800__Campana' } };
            //TestUtils.Simulate.change(localitySelect.getDOMNode(), event);
            //expect(eventValue).toEqual(event.target.value)
            //done()
        //}, 1000)
    })
})
