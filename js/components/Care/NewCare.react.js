import React from 'react/addons';
import CareForm from './CareForm.react.js';

export default class NewCare extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    //successCallback(careId) {
        //this.context.router.transitionTo('editarTurno', {careId: careId});
    //}

    render() {
        return (
            <div>
                <h1>Nuevo Turno</h1>
                <CareForm
                    />
            </div>
        );
    }
}

NewCare.contextTypes = {
    router: React.PropTypes.func
}
