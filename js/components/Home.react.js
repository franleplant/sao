import React from 'react/addons';
import sessionStore from '../stores/sessionStore.js';
import MiniCalendar from './dumb/MiniCalendar.react.js';
import AppointmentGrid from './dumb/AppointmentGrid.react.js'
import moment from 'moment';

export default class Home extends React.Component {

    constructor(props, context) {
        super(props)
        this.state = {
            date: new Date()
        }

        this.context = context;
    }

    newAppointment() {
        // Redirect to create an appointment
        this.context.router.transitionTo('crearTurno');
    }

    newAppointmentWithTime(time) {
        // Redirect to create an appointment
        this.context.router.transitionTo('crearTurno', {time: time});
    }

    editAppointment(appointmentId) {
        // On click go to the main page of the patient
        this.context.router.transitionTo('editarTurno', {appointmentId: appointmentId});
    }

    onDateChange(date) {
        this.setState({
            date: date
        })
    }

    render() {
        return (
            <div className="">
                <h1>
                    HOME!
                    <button
                        className="btn btn-primary pull-right"
                        onClick={this.newAppointment.bind(this)}
                        >Nuevo Turno</button>
                </h1>
                <div className="row">
                    <div className="col-xs-3">
                        <MiniCalendar onChange={this.onDateChange.bind(this)}/>
                    </div>
                    <div className="col-xs-9">
                        <AppointmentGrid
                            date={moment(this.state.date).format('YYYY-MM-DD')}
                            onEdit={this.editAppointment.bind(this)}
                            onCreate={this.newAppointmentWithTime.bind(this)}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.func
}
