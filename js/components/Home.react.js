import React from 'react/addons';
import sessionStore from '../stores/sessionStore.js';
import MiniCalendar from './dumb/MiniCalendar.react.js';
import AppointmentGrid from './dumb/AppointmentGrid.react.js'

export default class Home extends React.Component {

    constructor(props, context) {
        super(props)
        this.state = {
            date: new Date()
        }

        this.context = context;
    }

    componentDidMount() {
        //Get all appointments for today
    }

    newAppointment() {
        // Redirect to create an appointment
        this.context.router.transitionTo('crearTurno');
    }

    editAppointment(event, index, rowData) {
        // On click go to the main page of the patient
        this.context.router.transitionTo('editarTurno', {appointmentId: rowData[3]});
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
                    HOME!{this.state.date.valueOf()}
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
                        <AppointmentGrid/>
                    </div>
                </div>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.func
}
