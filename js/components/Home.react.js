import React from 'react/addons';
import sessionStore from '../stores/sessionStore.js';
import {DatePicker, FloatingActionButton} from 'material-ui';
import {Table, Column} from "fixed-data-table";


var rows = [
    ['15:00', 'Miguel Angel Faldutti', 'OSDE 210', 'id0'],
    ['15:15', 'Miguel Angel Faldutti', 'OSDE 210', 'id1'],
    ['15:30', 'Miguel Angel Faldutti', 'OSDE 210', 'id2']
];

function rowGetter(rowIndex) {
    return rows[rowIndex];
}

export default class Home extends React.Component {
    static willTransitionTo(transition) {
        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
        // ENABLE THIS TO ADD AUTHORIZATION
        //if (!sessionStore.isLoggedIn()) {
            //transition.redirect('/login');
        //}
    }

    constructor(props) {
        super(props)
    }

    newAppointment() {
        // Redirect to create an appointment
        this.context.router.transitionTo('crearTurno');
    }

    editAppointment(event, index, rowData) {
        // On click go to the main page of the patient
        this.context.router.transitionTo('editarTurno', {appointmentId: rowData[3]});
    }

    render() {
        return (
            <div>
                <h1>HOME!</h1>
                <DatePicker
                    defaultDate={new Date()}
                    mode="landscape"
                    />
                <FloatingActionButton
                    iconClassName="fa fa-plus"
                    secondary={true}
                    onClick={this.newAppointment.bind(this)}
                    />
                <Table
                    rowHeight={50}
                    rowGetter={rowGetter}
                    rowsCount={rows.length}
                    width={900}
                    height={5000}
                    headerHeight={50}
                    onRowClick={this.editAppointment.bind(this)}
                    >
                    <Column
                        label="Hora"
                        width={300}
                        dataKey={0}
                        flexGrow={0}
                        />
                    <Column
                        label="Nombre y Apellido"
                        width={100}
                        dataKey={1}
                        flexGrow={1}
                        />
                    <Column
                        label="Obra Social"
                        width={200}
                        dataKey={2}
                        flexGrow={0}
                        />
                </Table>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.func
}
