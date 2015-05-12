import React from 'react/addons';
import {TextField, FontIcon, RaisedButton, DatePicker} from 'material-ui';
import {Table, Column} from "fixed-data-table";
import Firebase from 'firebase';

import PatientForm from './PatientForm.react.js';

var patientsRef = new Firebase('https://luminous-fire-4753.firebaseio.com/patients');

export default class EditPatient extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            patient: null
        };

        this.patientId = context.router.getCurrentParams().patientId;

        patientsRef
            .child(this.patientId)
            .on('value', (snapshot) => {
                var patient = snapshot.val();
                if (!patient) {
                    throw new Error('No patient returned').stack
                }

                this.setState({
                    patient: patient
                })

            }, (error) => {
                throw error;
            });
    }

    render() {
        return (
            <div>
                <h1>Editar Paciente</h1>
                ID de Paciente: {this.patientId}
                <PatientForm patient={this.state.patient}/>
            </div>
        );
    }
}

EditPatient.contextTypes = {
    router: React.PropTypes.func
}
