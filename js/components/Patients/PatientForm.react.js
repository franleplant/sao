import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Firebase from 'firebase';
import sessionStore from '../../stores/sessionStore.js';
import argutils from '../../argutils.js';
import OSSelect from '../dumb/OSSelect.react.js';
import LocalitySelect from '../dumb/LocalitySelect.react.js';

//TODO: refactor this shit
var patientsRef

export default class PatientForm extends React.Component {
    constructor(props) {
        super(props);
        patientsRef = (new Firebase('https://luminous-fire-4753.firebaseio.com/users'))
                    .child(sessionStore.getUserId())
                    .child('patients');
        this.state = {
            locOptions: [],
            patientName: '',
            patientEmail: '',
            patientDNI: '',
            patientDOB: '',
            patientAddress: '',
            patientLocality: '',
            patientOSId: '',
            patientOSaffiliateNumber: '',
            patientOSplan: '',
            patientTel: '',
            patientMedicalHistory: ''
        };

    }

    componentDidMount() {
        var patientId = this.props.patientId;
        if (!patientId) return;

        // Get the patient and dont listen for further changes.
        patientsRef
            .child(patientId)
            .once('value', (snapshot) => {
                var patient = snapshot.val();
                if (!patient) {
                    alert('El paciente seleccionado no existe');
                };

                this.setState({
                    patientName: patient.name,
                    patientEmail: patient.email,
                    patientDNI: patient.DNI,
                    patientDOB: patient.DOB,
                    patientLocality: patient.locality,
                    patientAddress: patient.address,
                    patientOSaffiliateNumber: patient.osAffiliateNumber,
                    patientOSId: patient.osId,
                    patientOSplan: patient.osPlan,
                    patientTel: patient.tel,
                    patientMedicalHistory: patient.medicalHistory,
                    // Save a reference to the original patient
                    patient: patient,
                    auditEdited: patient.auditEdited || 'nunca',
                    auditCreated: patient.auditCreated
                })

            }, (error) => {
                throw error;
            });
    }

    deletePatient() {
        if (!confirm('Esta seguro que desea borrar el pacient? Esta accion es irreversible.')) {
            return;
        }

        patientsRef
            .child(this.props.patientId)
            .remove((error) => {
                if (error) {
                    alert('Error al borrar el paciente');
                    return;
                }

                alert('Paciente borrado con exito');
                this.props.onDeleteCallback();
            });
    }

    submit(event) {
        event.preventDefault();

        var loggedInUser = sessionStore.getUsername();
        if (!loggedInUser) {
            // This should not happen ever
            alert('Tu sesion ha expirado, por favor volve a iniciar sesion');
            return;
        }

        var patient = {
            name: this.state.patientName,
            DNI: this.state.patientDNI,
            tel: this.state.patientTel,
            DOB: this.state.patientDOB,
            email: this.state.patientEmail,
            address: this.state.patientAddress,
            locality: this.state.patientLocality,
            medicalHistory: this.state.patientMedicalHistory,
            osId: this.state.patientOSId,
            osPlan: this.state.patientOSplan,
            osAffiliateNumber: this.state.patientOSaffiliateNumber
        }


        // If we are creating a new patient
        if (!this.props.patientId) {
            // When we add Dominios de Informacion this wont be always the case
            // TODO: ownerEmail should be set to the currently selected DI
            // owner
            patient.ownerEmail =  loggedInUser;
            patient.auditCreated = (new Date()).toUTCString()  + ' por ' + loggedInUser;

            var newPatientRef = patientsRef
                .push(patient, () => {
                    //on complete
                    alert('El Paciente ha sido creado exitosamente!');

                    //hackish trick to have access to the newPatientId
                    setTimeout(() => {
                        // Need to do this because firebase returns the whole ref (URL) to the new patient
                        // and I only want to use the ID for now
                        var newPatientId = newPatientRef.key()
                        this.props.successCallback(newPatientId);
                    }, 100)
                });
        } else {
            // we are editting
            patient.auditEdited =  (new Date()).toUTCString()  + ' por ' + loggedInUser;


            patientsRef
                .child(this.props.patientId)
                .update(patient, () => {
                    alert('El paciente ha sido editado exitosamente')
                    // Update the UI with the last edited date
                    this.setState({
                            auditEdited: patient.auditEdited
                        })
                });
        }


    }


    render() {
        var auditAndDeleteElements;

        if (this.props.patientId) {
            auditAndDeleteElements = (
                <fieldset className="form-inline">
                    <div className="form-group">
                        <label>Creacion</label>
                        <input
                            className="form-control margin-left-1x"
                            type="text"
                            disabled
                            value={this.state.auditCreated}
                            />
                    </div>
                    <div className="form-group margin-left-1x">
                        <label>Ultima edicion</label>
                        <input
                            className="form-control margin-left-1x"
                            type="text"
                            disabled
                            value={this.state.auditEdited}
                            />
                    </div>

                    <button
                        onClick={this.deletePatient.bind(this)}
                        type="button"
                        className="btn btn-danger pull-right"
                        >
                            Borrar
                    </button>
                </fieldset>
            );
        }

        return (
            <form onSubmit={this.submit.bind(this)}>

                {auditAndDeleteElements}


                <div className="form-group">
                    <label>Nombre y Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo: Juanito Perez"
                        name="patientName"
                        required
                        valueLink={this.linkState('patientName')}
                        />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ejemplo: juan_perez@pokemart.com.ar"
                        name="patientEmail"
                        valueLink={this.linkState('patientEmail')}
                        />
                </div>

                <div className="form-group">
                    <label>DNI</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo: 123456789"
                        required
                        name="patientDNI"
                        valueLink={this.linkState('patientDNI')}
                        />
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        required
                        name="patientDOB"
                        valueLink={this.linkState('patientDOB')}
                        />
                </div>

                <div className="form-group">
                    <label>Telefono</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo: Tel: 01234 123566, Cel: 011 15 12345677"
                        required
                        name="patientTel"
                        valueLink={this.linkState('patientTel')}
                        />
                </div>

                <fieldset className="addressForm">
                    <h3>Domicilio</h3>

                    <LocalitySelect
                        valueLink={this.linkState('patientLocality')}
                        defaultValue={this.state.patientLocality}
                        />


                    <div className="form-group">
                        <label>Direccion</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ejemplo: Av Siempre Viva 123"
                            required
                            name="patientAddress"
                            valueLink={this.linkState('patientAddress')}
                            />
                    </div>

                </fieldset>



                <fieldset className="osForm">
                    <h3>Datos de Obra Social</h3>
                    <div className="form-group">
                        <label>Obra Social</label>
                        <OSSelect
                            className="form-control"
                            valueLink={this.linkState('patientOSId')}
                            defaultValue={this.state.patientOSId}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Numero de Socio</label>
                        <input
                            valueLink={this.linkState('patientOSaffiliateNumber')}
                            name="patientOSaffiliateNumber"
                            type="text"
                            className="form-control"
                            placeholder="Numero de Socio"
                            />
                    </div>

                    <div className="form-group">
                        <label>Plan</label>
                        <input
                            valueLink={this.linkState('patientOSplan')}
                            name="patientOSplan"
                            type="text"
                            className="form-control"
                            placeholder="Plan"
                            />
                    </div>
                </fieldset>

                <div className="form-group">
                    <label>Historia Clinica</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        name="patientMedicalHistory"
                        valueLink={this.linkState('patientMedicalHistory')}
                        >
                    </textarea>
                </div>


                <button type="submit" className="btn btn-primary">Aceptar</button>

            </form>
        );
    }
}


ReactMixin(PatientForm.prototype, React.addons.LinkedStateMixin);
