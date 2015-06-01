import React from 'react/addons';
import moment from 'moment';
import timeSlots from '../../utils/appointmentTimeSlots.js';
import appointmentListStore from '../../stores/appointmentListStore.js';
import appointmentListActions from '../../actions/appointmentListActions.js';



// Input: a selected date format: "2015-05-30"
//
export default class AppointmentGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

        this.appointmentList = [];

        appointmentListStore.onChange(() => {
            this.appointmentList = appointmentListStore.getAppointmentList();
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[60].scrollIntoView(true);

        // Kickoff loading
        appointmentListActions.getDailyData(this.props.date);
    }

    componentWillReceiveProps(newProps) {
        // Kickoff loading
        appointmentListActions.getDailyData(newProps.date);
        this.setState({
            loading: true
        });
    }

    componentWillUpdate() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[60].scrollIntoView(true);
    }

    onAppointmentClick(event, appointmentId) {
        // Avoid <td> parent element onClick handler from being called
        event.preventDefault();
        event.stopPropagation();
        this.props.onEdit(appointmentId)
    }

    onTimeSlotClick(event, time) {
        var handler = this.props.onCreate;
        if (!handler) return;

        handler(time);
    }

    render() {
        var hash = {};

        // Create a hash of times for improved performance
        this.appointmentList.forEach((appointment, index) => {
            var time = appointment.selectedTime;

            if (!Array.isArray(hash[time])) {
                 hash[time] = [];
            }

            hash[time].push(index);
        })



        var rows = timeSlots.map((time) => {
            return (
                <tr key={time} ref={time}>
                    <td>{time}</td>
                    <td onClick={(event) => {this.onTimeSlotClick.call(this, event, time)}}>
                        <p className="text-1-3x">
                        {
                            hash[time] && hash[time].map((index) => {
                                //TODO: add a nice tool tip with info
                                var appointment = this.appointmentList[index];
                                var patient = appointment.selectedPatient;
                                return (
                                    <span
                                        className="label label-primary margin-left-1x cursor-pointer"
                                        key={appointment.appointmentId}
                                        onClick={(event) => { this.onAppointmentClick.call(this, event, appointment.appointmentId) }}
                                        >
                                        {patient.name + ' ' + patient.tel}
                                    </span>
                                );
                            })
                        }
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
                                Pacientes &nbsp;
                                { this.state.loading ? <i className="fa fa-spinner"></i> : null }
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
