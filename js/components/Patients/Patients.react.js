import React from 'react/addons';
import {Table, Column} from "fixed-data-table";
import {TextField, FontIcon, FloatingActionButton} from 'material-ui';

var rows = [
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id0'],
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id1'],
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id2']
];

function rowGetter(rowIndex) {
    return rows[rowIndex];
}


export default class Patients extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    newPatient() {
        // Redirect to create a patient
        this.context.router.transitionTo('crearPaciente');
    }

    handleClick(event, index, rowData) {
        // On click go to the main page of the patient
        // This feature of Es6 is called template strings
        this.context.router.transitionTo('editarPaciente', {patientId: rowData[4]});
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
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    width={900}
                    height={5000}
                    headerHeight={50}
                    onRowClick={this.handleClick.bind(this)}
                    >
                    <Column
                        label="Nombre y Apellido"
                        width={300}
                        dataKey={0}
                        flexGrow={0}
                        />
                    <Column
                        label="DNI"
                        width={100}
                        dataKey={1}
                        flexGrow={0}
                        />
                    <Column
                        label="Telefono"
                        width={200}
                        dataKey={2}
                        flexGrow={0}
                        />

                    <Column
                        label="Obra Social y Plan"
                        width={200}
                        dataKey={3}
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
