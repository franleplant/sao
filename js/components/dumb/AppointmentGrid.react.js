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

        this._onChange = this._onChange.bind(this);


        this.state = {
            loading: true,
            businessHours: props.businessHours || {}
        }

        this.appointmentList = [];
    }

    componentDidMount() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[70].scrollIntoView(true);

        appointmentListStore.onChange(this._onChange);

        // Kickoff loading
        appointmentListActions.getDailyData(this.props.date);
    }

    componentWillUnmount() {
        appointmentListStore.removeChangeListener(this._onChange);
    }


    _onChange() {
        this.appointmentList = appointmentListStore.getAppointmentList() || [];
        this.setState({
            loading: false
        })
    }

    componentWillReceiveProps(newProps) {
        // Kickoff loading
        appointmentListActions.getDailyData(newProps.date);

        this.setState({
            loading: true,
            businessHours: newProps.businessHours
        });
    }

    componentWillUpdate() {
        // Very simple way of scrolling the hours table
        var node = React.findDOMNode(this);
        node.querySelectorAll('td')[70].scrollIntoView(true);
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


        let rowBuilder = (appointments) => {
            if (!appointments) {
                return <td colSpan="10"></td>
            }

            return appointments.map((index) => {
                //TODO: add a nice tool tip with info
                var appointment = this.appointmentList[index];
                var patient = appointment.selectedPatient;
                return (
                    <td rowSpan={`${appointment.duration || 1}`}>
                        <p className="text-1-3x max-height-20px">
                            <span
                                className="label label-primary margin-left-1x cursor-pointer inline-block"
                                style={{
                                    height: `${35 * (appointment.duration || 1)}px`,
                                    lineHeight: 'inherit'
                                }}
                                key={appointment.appointmentId}
                                onClick={(event) => { this.onAppointmentClick.call(this, event, appointment.appointmentId) }}
                                >
                                {patient.name + ' ' + patient.tel}
                            </span>
                        </p>
                    </td>
                );
            })
        }

        var rows = timeSlots.map((time) => {
            let businessHours = this.state.businessHours;
            let disabled = !businessHours.enabled || time < businessHours.startHour || time > businessHours.endHour || !!this.props.isOooDate
            return (
                <tr key={time} ref={time} onClick={(event) => {if (disabled) return; this.onTimeSlotClick.call(this, event, time)}} className={disabled ? 'disabled' : undefined}>
                    <td>{time}</td>
                        {rowBuilder(hash[time])}
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
                                { this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : null }
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
