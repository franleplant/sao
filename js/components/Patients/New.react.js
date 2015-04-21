import React from 'react';
import {TextField, FontIcon, RaisedButton, DatePicker} from 'material-ui';
import PatientForm from './Form.react.js';
import {Navigation} from '../../router.js';


export default class NewPatient extends React.Component {
    constructor(props, context) {
        super(props);
        this.patientId = context.router.getCurrentParams().patientId;
    }

    render() {
        return (
            <div>
                <Navigation/>
                <h1>Nuevo Paciente</h1>
                <PatientForm/>
            </div>
        );
    }
}

NewPatient.contextTypes = {
    router: React.PropTypes.func
}
