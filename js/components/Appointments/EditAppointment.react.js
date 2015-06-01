import React from 'react/addons';
import {TextField, FontIcon, FloatingActionButton} from 'material-ui';
import AppointmentForm from './AppointmentForm.react.js';

export default class EditAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        this.appointmentId = context.router.getCurrentParams().appointmentId;
    }

    onDeleteCallback() {
        this.context.router.transitionTo('home');
    }

    render() {
        return (
            <div>
                <h1>Editar Turno</h1>
                <AppointmentForm appointmentId={this.appointmentId} onDeleteCallback={this.onDeleteCallback.bind(this)}/>
            </div>
        );
    }
}

EditAppointment.contextTypes = {
    router: React.PropTypes.func
}
