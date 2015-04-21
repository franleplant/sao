import React from 'react/addons';
import router, {Navigation} from '../router.js';
import {Table, Column} from "fixed-data-table";

import {TextField, FontIcon, FloatingActionButton} from 'material-ui';


var rows = [
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id'],
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id'],
    ['Miguel Angel Faldutti', '12345678', '011 15 1234 5678', 'OSDE 210', 'id']
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
  }


export default class Patients extends React.Component {
    constructor(props) {
        super(props);
    }

    newPatient() {
        // Redirect to create a patient
        router.transitionTo('/pacientes/new');
    }

    handleClick(event, index, rowData) {
        // On click go to the main page of the patient
        // This feature of Es6 is called template strings
        router.transitionTo(`/pacientes/${rowData[4]}`);
    }

    // The search box should act as a filter for the table below
    render() {
        return (
            <div>
                <Navigation/>
                <h1>Pacientes!</h1>
                <FontIcon className="fa fa-search"/>
                <TextField hintText="buscar" />

                <FloatingActionButton
                    iconClassName="fa fa-plus"
                    secondary={true}
                    onClick={this.newPatient.bind(this)}
                    />


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


