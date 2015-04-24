import React from 'react/addons';
import {TextField, FontIcon, FloatingActionButton} from 'material-ui';
import AppointmentForm from './AppointmentForm.react.js';



export default class NewAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    // The search box should act as a filter for the table below
    render() {
        return (
            <div>
                <h1>Nuevo Turno!</h1>
                <AppointmentForm/>
            </div>
        );
    }
}

NewAppointment.contextTypes = {
    router: React.PropTypes.func
}
