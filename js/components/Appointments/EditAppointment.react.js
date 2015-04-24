import React from 'react/addons';
import {TextField, FontIcon, FloatingActionButton} from 'material-ui';
import AppointmentForm from './AppointmentForm.react.js';

export default class EditAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    render() {
        return (
            <div>
                <h1>Editar Turno!</h1>
                <AppointmentForm/>
            </div>
        );
    }
}

EditAppointment.contextTypes = {
    router: React.PropTypes.func
}
