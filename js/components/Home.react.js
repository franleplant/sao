import React from 'react/addons';
import sessionStore from '../stores/sessionStore.js';
import MiniCalendar from './dumb/MiniCalendar.react.js';


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
        this.state = {
            date: new Date()
        }
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
            <div>
                <h1>HOME!{this.state.date.valueOf()}</h1>
                <MiniCalendar onChange={this.onDateChange.bind(this)}/>
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.func
}
