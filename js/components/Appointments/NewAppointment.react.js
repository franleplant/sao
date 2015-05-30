import React from 'react/addons';
import AppointmentForm from './AppointmentForm.react.js';



export default class NewAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    successCallback(appointmentId) {
        this.context.router.transitionTo('editarTurno', {appointmentId: appointmentId});
    }

    render() {
        return (
            <div>
                <h1>Nuevo Turno!</h1>
                <AppointmentForm  successCallback={this.successCallback.bind(this)}/>
            </div>
        );
    }
}

NewAppointment.contextTypes = {
    router: React.PropTypes.func
}
