import React from 'react/addons';
import ReactMixin from 'react-mixin';
import moment from 'moment';

import SearchPatients from '../dumb/SearchPatients.react.js';
import Audit from '../dumb/Audit.react.js';
import appointmentResource from '../../appointmentResource.js';
import timeSlots from '../../utils/appointmentTimeSlots.js';

export default class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTime: props.time || '09:00',
            selectedDate: moment().format('YYYY-MM-DD'),
            selectedPatientId: '',
            // Not used for now
            selectedPatient: {}
        }
    }

    componentDidMount() {
        // Only if we are editting
        var appointmentId = this.props.appointmentId;
        if (!appointmentId) return;

        // Get the patient
        appointmentResource
            .getById(appointmentId)
            .then((appointment) => {
                // It already comes with the patient bound

                this.setState({
                    selectedTime: appointment.selectedTime,
                    selectedDate: appointment.selectedDate,
                    selectedPatientId: appointment.selectedPatientId,
                    //not used for now
                    selectedPatient: appointment.selectedPatient,
                    appointment: appointment,
                    auditEdited: appointment.auditEdited || 'nunca',
                    auditCreated: appointment.auditCreated
                })

            })
            .catch((reason) => {
                alert('El turno seleccionado no existe');
                throw reason;
            });
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

        appointmentResource
            .remove(this.props.appointmentId)
            .catch((error) => {
                alert('Error al borrar turno');
                throw error;
            })
            .then(() => {
                alert('turno borrado con exito');
                this.props.onDeleteCallback();
            });
    }

    submit(event) {
        event.preventDefault();

        var appointment = {
            selectedTime: this.state.selectedTime,
            selectedDate: this.state.selectedDate,
            selectedPatientId: this.state.selectedPatientId
        };


        // If we are creating an appointment
        if (!this.props.appointmentId)  {

            appointmentResource
                .create(appointment)
                .then((id, newAppointment) => {
                    alert('El turno ha sido creado exitosamente!');
                    this.props.successCallback(id);
                })
                .catch((reason) => {
                    alert('Ha habido un problema al crear el turno, por favor volve a intentar');
                    throw reason;
                })

        } else {
            appointmentResource
                .update(this.props.appointmentId, appointment)
                .then((id) => {
                    alert('El turno ha sido editado exitosamente')
                    // Update the UI with the last edited date
                    this.setState({
                            auditEdited: appointment.auditEdited
                        })
                })
                .catch((reason) => {
                    alert('Ha habido un problema al editar el turno');
                    throw reason;
                })
        }

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

                <button type="submit" className="btn btn-primary margin-bottom-20">Aceptar</button>

                <Audit
                    show={this.props.appointmentId}
                    edited={this.state.auditEdited}
                    created={this.state.auditCreated}
                    onDelete={this.deleteAppointment.bind(this)}
                    />
            </form>
        );
    }
}


ReactMixin(AppointmentForm.prototype, React.addons.LinkedStateMixin);
