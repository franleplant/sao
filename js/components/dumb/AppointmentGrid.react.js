import React from 'react/addons';
import moment from 'moment';
import timeSlots from '../../utils/appointmentTimeSlots.js';



export default class AppointmentGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[60].scrollIntoView(true);
    }

    componentWillUpdate() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[60].scrollIntoView(true);
    }

    render() {
        var rows = timeSlots.map((time) => {
            return (
                <tr key={time}>
                    <td>{time}</td>
                    <td>
                        <p className="text-1-3x">
                        <span className="label label-default">Paciente A OSDE</span>&nbsp;
                        <span className="label label-default">Paciente A PAMI</span>&nbsp;
                        <span className="label label-default">Paciente A IOMA</span>&nbsp;
                        </p>
                    </td>
                </tr>
            );
        })

        return (
            <div>
                <table className="table table-hover table-scroll-table-header">
                    <thead>
                        <tr>
                            <th>
                                Hora
                            </th>
                            <th>
                                Pacientes
                            </th>
                        </tr>
                    </thead>
                </table>

                <div className="table-scroll-wrapper">
                    <table className="table table-hover">
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
