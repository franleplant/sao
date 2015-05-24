import React from 'react/addons';
import {Table, Column} from "fixed-data-table";
import _ from 'lodash';
import Firebase from 'firebase';

import osutils from '../../osutils.js';

var patientsRef = new Firebase('https://luminous-fire-4753.firebaseio.com/patients');


export default class Patients extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            patients: []
        }

        this.context = context;
    }

    componentDidMount() {
        patientsRef.once('value', (snapshot) => {
            var patientHash = snapshot.val();

            var patients = _.values(
                _.forIn(patientHash, (patient, patientId) => {
                    patient.id = patientId;

                    patient.osName = osutils.getNameById(patient.osId);
                    return patient;
                })
            )


            this.setState({
                patients: patients
            })
        })
    }

    rowGetter(rowIndex) {
        return this.state.patients[rowIndex]
    }

    newPatient() {
        // Redirect to create a patient
        this.context.router.transitionTo('crearPaciente');
    }

    handleClick(event, index, patient) {
        // On click go to the main page of the patient
        this.context.router.transitionTo('editarPaciente', {patientId: patient.id});
    }

    // The search box should act as a filter for the table below
    render() {
        return (
            <div>
                <h1>
                    Pacientes!
                    <button
                        className="btn btn-primary pull-right"
                        type="button"
                        onClick={this.newPatient.bind(this)}
                        >
                        <i className="fa fa-plus"></i>
                    </button>
                </h1>

                <form className="form-inline">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Ej: Carlos Salguero"/>
                    </div>
                    <button type="submit" className="btn btn-default">
                        <i className="fa fa-search"></i>Buscar
                    </button>
                </form>


                <Table
                    rowHeight={50}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.patients.length}
                    width={900}
                    height={5000}
                    headerHeight={50}
                    onRowClick={this.handleClick.bind(this)}
                    >
                    <Column
                        label="Nombre y Apellido"
                        width={300}
                        dataKey={'name'}
                        flexGrow={0}
                        />
                    <Column
                        label="DNI"
                        width={100}
                        dataKey={'DNI'}
                        flexGrow={0}
                        />
                    <Column
                        label="Telefono"
                        width={200}
                        dataKey={'tel'}
                        flexGrow={0}
                        />

                    <Column
                        label="Obra Social y Plan"
                        width={200}
                        dataKey={'osName'}
                        flexGrow={1}
                        />
                </Table>
            </div>
        );
    }
}

Patients.contextTypes = {
    router: React.PropTypes.func
}
