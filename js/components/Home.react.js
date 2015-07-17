import React from 'react/addons';
import sessionStore from '../stores/sessionStore.js';
import MiniCalendar from './dumb/MiniCalendar.react.js';
import AppointmentGrid from './dumb/AppointmentGrid.react.js'
import moment from 'moment';
import homeStore from '../stores/homeStore.js';
import homeActions from '../actions/homeActions.js';

const dFormat ='YYYY-MM-DD';

export default class Home extends React.Component {
    constructor(props, context) {
        super(props)
        this.context = context;
        this._onChange = this._onChange.bind(this);

        this.state = homeStore.getState();

        this.state.businessHours = {enabled: true};
        this.state.oooDates = {};
    }

    componentDidMount() {
        homeStore.onChange(this._onChange);
    }

    componentWillUnmount() {
        homeStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(homeStore.getState());
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

    onDateChange(date, businessHours, oooDates) {
        homeActions.selectDate(date);

        this.setState({ businessHours, oooDates })
    }

    render() {
        return (
            <div className="">
                <h1>
                    Bienvenido!
                    <button
                        className="btn btn-primary pull-right"
                        onClick={this.newAppointment.bind(this)}
                        disabled={
                            !this.state.businessHours.enabled ||
                            (
                                this.state.oooDates.start <= moment(this.state.date).format(dFormat) &&
                                this.state.oooDates.end >= moment(this.state.date).format(dFormat)
                            )
                        }
                        >
                        Nuevo Turno
                    </button>
                </h1>

                {(
                    !this.state.businessHours.enabled ||
                    (
                        this.state.oooDates.start <= moment(this.state.date).format(dFormat) &&
                        this.state.oooDates.end >= moment(this.state.date).format(dFormat)
                    )
                ) &&
                    <p className="alert alert-warning">
                        El dia de la fecha ha sido marcado como dia no laboral, ver configuracion de cuenta.
                    </p>


                }
                <div className="row">
                    <div className="col-xs-3">
                        <MiniCalendar onChange={this.onDateChange.bind(this)} value={this.state.date}/>
                    </div>
                    <div className="col-xs-9">
                        <AppointmentGrid
                            date={moment(this.state.date).format('YYYY-MM-DD')}
                            businessHours={this.state.businessHours}
                            isOooDate={
                                this.state.oooDates.start <= moment(this.state.date).format(dFormat) &&
                                this.state.oooDates.end >= moment(this.state.date).format(dFormat)
                            }
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
