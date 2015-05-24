import React from 'react';
import {TextField, FontIcon, RaisedButton, DatePicker} from 'material-ui';
import PatientForm from './PatientForm.react.js';


export default class NewPatient extends React.Component {
    constructor(props, context) {
        super(props);
        this.patientId = context.router.getCurrentParams().patientId;
    }

    successCallback(patientId) {
        this.context.router.transitionTo('editarPaciente', {patientId: patientId});
    }

    render() {
        return (
            <div>
                <h1>Nuevo Paciente</h1>
                <PatientForm successCallback={this.successCallback.bind(this)}/>
            </div>
        );
    }
}

NewPatient.contextTypes = {
    router: React.PropTypes.func
}
