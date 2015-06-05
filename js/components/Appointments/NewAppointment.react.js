import React from 'react/addons';
import AppointmentForm from './AppointmentForm.react.js';
import patientActions from '../../actions/patientActions.js';



export default class NewAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        this.time = context.router.getCurrentParams().time;

        // Clean up the selected patient
        patientActions.clean();
    }

    successCallback(appointmentId) {
        this.context.router.transitionTo('editarTurno', {appointmentId: appointmentId});
    }

    render() {
        return (
            <div>
                <h1>Nuevo Turno</h1>
                <AppointmentForm
                    successCallback={this.successCallback.bind(this)}
                    time={this.time}
                    />
            </div>
        );
    }
}

NewAppointment.contextTypes = {
    router: React.PropTypes.func
}
