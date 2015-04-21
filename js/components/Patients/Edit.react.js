import React from 'react/addons';
import {TextField, FontIcon, RaisedButton, DatePicker} from 'material-ui';
import {Table, Column} from "fixed-data-table";

import PatientForm from './Form.react.js';


export default class EditPatient extends React.Component {
    constructor(props, context) {
        super(props);
        this.patientId = context.router.getCurrentParams().patientId;
    }

    render() {
        return (
            <div>
                <h1>Pacientes Editar</h1>
                ID de Paciente: {this.patientId}
                <PatientForm/>
            </div>
        );
    }
}

EditPatient.contextTypes = {
    router: React.PropTypes.func
}
