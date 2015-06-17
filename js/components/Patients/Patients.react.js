import React from 'react/addons';
import {Table, Column} from "fixed-data-table";
import _ from 'lodash';
import Firebase from 'firebase';
import sessionStore from '../../stores/sessionStore.js';

import osutils from '../../osutils.js';
import patientResource from '../../patientResource.js';


export default class Patients extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            patients: [],
            loading: false
        }

        this.context = context;
    }

    componentDidMount() {
        patientResource
            .getSome()
            .then((patients) => {
                this.setRows(patients, true)
            });
    }

    searchPatients(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            loading: true
        });

        var searchText = this.refs.searchInput.getDOMNode().value;

        patientResource
            .search(searchText)
            .catch(console.log.bind(console))
            .then((result) => {
                this.setRows(result);
                this.setState({
                    loading: false
                });
            })
    }

    setRows(patients, failSilently) {
        if (!patients.length && !failSilently) {
            alert('La busqueda no arrojo resultados')
        }

        this.setState({
            patients: patients
        });
    }

    rowGetter(rowIndex) {
        return this.state.patients[rowIndex]
    }

    newPatient() {
        // Redirect to create a patient
        this.context.router.transitionTo('crearPaciente');
    }

    editPatient(event, index, patient) {
        // On click go to the main page of the patient
        this.context.router.transitionTo('editarPaciente', {patientId: patient.patientId});
    }

    // The search box should act as a filter for the table below
    render() {
        return (
            <div>
                <h1>
                    Pacientes
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
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ej: Carlos Salguero"
                            ref="searchInput"
                            required
                            />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-default"
                        onClick={this.searchPatients.bind(this)}
                        >
                        <i className="fa fa-search"></i>
                        Buscar
                        { this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : null}
                    </button>
                </form>


                <Table
                    rowHeight={50}
                    rowGetter={this.rowGetter.bind(this)}
                    rowsCount={this.state.patients.length}
                    width={900}
                    height={400}
                    headerHeight={50}
                    onRowClick={this.editPatient.bind(this)}
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
                        label="Obra Social"
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
