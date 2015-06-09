import React from 'react/addons';
import AppointmentForm from './AppointmentForm.react.js';
import careActions from '../../actions/careActions.js';

export default class EditAppointment extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        this.appointmentId = context.router.getCurrentParams().appointmentId;
    }

    onDeleteCallback() {
        this.context.router.transitionTo('home');
    }

    care() {
        careActions.clean();
        this.context.router.transitionTo('crearConsulta');
    }

    render() {
        return (
            <div>
                <h1>
                    Editar Turno
                    <button
                        className="btn btn-primary pull-right"
                        type="button"
                        onClick={this.care.bind(this)}
                        >
                        Atender
                    </button>
                </h1>
                <AppointmentForm appointmentId={this.appointmentId} onDeleteCallback={this.onDeleteCallback.bind(this)}/>
            </div>
        );
    }
}

EditAppointment.contextTypes = {
    router: React.PropTypes.func
}
