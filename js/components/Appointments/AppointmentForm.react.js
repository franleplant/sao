import React from 'react/addons';
import ReactMixin from 'react-mixin';
import moment from 'moment';

import SearchPatients from '../dumb/SearchPatients.react.js';
import Audit from '../dumb/Audit.react.js';
import timeSlots from '../../utils/appointmentTimeSlots.js';

import appointmentStore from '../../stores/appointmentStore.js';
import homeStore from '../../stores/homeStore.js';
import appointmentActions from '../../actions/appointmentActions.js';


export default class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        this.state = {
            selectedTime: props.time || '09:00',
            // Create the new appointment in the day which the user was navigating
            // in the appointment grid :)
            selectedDate: moment(homeStore.getState().date).format('YYYY-MM-DD'),
            selectedPatientId: '',
            // Not used for now
            selectedPatient: {}
        }
    }

    componentDidMount() {
        appointmentStore.onChange(this._onChange);

        // Only if we are editting
        var appointmentId = this.props.appointmentId;
        if (!appointmentId) return;
        appointmentActions.get(appointmentId)
        this.setState({
            loading: true
        })
    }

    componentWillUnmount() {
        appointmentStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var newState = appointmentStore.getState();

        if (newState.meta.justRemoved) {
            this.props.onDeleteCallback();
            return;
        }

        newState.loading = false;

        this.setState(newState);

        if (newState.meta.justCreated) {
            this.props.successCallback(newState.appointmentId);
        }
    }

    selectPatient(patientId) {
        this.setState({
            selectedPatientId: patientId
        })
    }

    deleteAppointment() {
        if (!confirm('Esta seguro que desea borrar el turno? Esta accion es irreversible.')) {
            return;
        }

        appointmentActions.remove(this.props.appointmentId)
        this.setState({
            loading: true
        })
    }

    submit(event) {
        event.preventDefault();

        var appointment = {
            selectedTime: this.state.selectedTime,
            selectedDate: this.state.selectedDate,
            selectedPatientId: this.state.selectedPatientId
        };

        if (!this.props.appointmentId)  {
            //Appointment Creation
            appointmentActions.create(appointment);
        } else {
            //Appointment Edition
            appointmentActions.update(this.props.appointmentId, appointment);
        }

        this.setState({
            loading: true
        })

    }

    render() {
        var options = timeSlots.map((time) => {
                return (
                    <option key={time} value={time}>
                        {time}
                    </option>
                );
            })


        return (
            <div>
                { this.state.loading ? <i className="fa fa-spinner"></i> : null }
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.submit.bind(this)}>

                            <fieldset className="row">
                                <div className="form-group col-xs-6">
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        required
                                        valueLink={this.linkState('selectedDate')}
                                        />
                                </div>

                                <div className="form-group col-xs-6">
                                    <label>Hora</label>
                                    <select
                                        required
                                        className="form-control"
                                        valueLink={this.linkState('selectedTime')}
                                        defaultValue={this.state.selectedTime}
                                        >
                                        {options}
                                    </select>
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <label>Paciente</label>
                                <SearchPatients value={this.state.selectedPatientId} onChange={this.selectPatient.bind(this)}/>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.loading}
                                >
                                Aceptar
                            </button>
                        </form>
                    </div>
                </div>

                <Audit
                    show={this.props.appointmentId}
                    edited={this.state.auditEdited || 'nunca'}
                    created={this.state.auditCreated}
                    onDelete={this.deleteAppointment.bind(this)}
                    />
            </div>
        );
    }
}


ReactMixin(AppointmentForm.prototype, React.addons.LinkedStateMixin);
