import React from 'react/addons';
import PatientForm from './PatientForm.react.js';


export default class EditPatient extends React.Component {
    constructor(props, context) {
        super(props);
        this.patientId = context.router.getCurrentParams().patientId;
    }

    onDeleteCallback() {
        this.context.router.transitionTo('pacientes');
    }

    render() {
        return (
            <div>
                <h1>Editar Paciente</h1>
                <PatientForm patientId={this.patientId} onDeleteCallback={this.onDeleteCallback.bind(this)}/>
            </div>
        );
    }
}

EditPatient.contextTypes = {
    router: React.PropTypes.func
}
