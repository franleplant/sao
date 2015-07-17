import React from 'react/addons';
import timeSlots from '../../utils/appointmentTimeSlots.js';
import userResource from '../../userResource.js';


const DEFAULT_START = '09:00'
const DEFAULT_END = '18:00'
const dayIndex = [0,1,2,3,4,5,6]
const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
]



export default class BusinessHoursManagement extends React.Component {
    constructor(props, context) {
        super(props);

        this.state = {
            meta: {
                loading: false
            },
            oooDates: {start: '', end: ''},
            businessHours: [{
                // Sunday
                enabled: false,
                startHour: '',
                endHour: ''
            },{
                enabled: true,
                startHour: DEFAULT_START,
                endHour: DEFAULT_END
            },{
                enabled: true,
                startHour: DEFAULT_START,
                endHour: DEFAULT_END
            },{
                enabled: true,
                startHour: DEFAULT_START,
                endHour: DEFAULT_END
            },{
                enabled: true,
                startHour: DEFAULT_START,
                endHour: DEFAULT_END
            },{
                enabled: true,
                startHour: DEFAULT_START,
                endHour: DEFAULT_END
            },{
                //Saturday
                enabled: false,
                startHour: '',
                endHour: ''
            }]
        }

    }

    componentDidMount() {
        this.setState({
            meta: {
                loading: true
            }
        })
        userResource
            .getRef()
            .child('businessHours')
            .once('value', (snapshot) => {
                let hours = snapshot.val();
                this.setState({
                    meta: {
                        loading: false
                    }
                })
                if (!hours) return;

                this.setState({
                    businessHours: hours
                })
            })

        userResource
            .getRef()
            .child('oooDates')
            .once('value', (snapshot) => {
                this.setState({
                    meta: {
                        loading: false
                    }
                })

                let oooDates = snapshot.val();

                if (!oooDates) return;

                this.setState({ oooDates })
            });

    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            meta: {
                loading: true
            }
        })

        userResource
            .getRef()
            .child('businessHours')
            .set(this.state.businessHours, () => {
                this.setState({
                    meta: {
                        loading: false
                    }
                })

            });
    }

    handleOooSubmit(event) {
        event.preventDefault();

        this.setState({
            meta: {
                loading: true
            }
        })

        userResource
            .getRef()
            .child('oooDates')
            .set(this.state.oooDates, () => {
                this.setState({
                    meta: {
                        loading: false
                    }
                })

            });
    }

    render() {
        let options = (startHour) => {
            let slots = timeSlots;

            if (startHour) {
                slots = slots.slice(slots.indexOf(startHour));
            }

            return slots.map((time) => {
                return (
                    <option key={time} value={time}>
                        {time}
                    </option>
                );
            })
        }

        return (
            <div>
                <h1>Horarios y Disponibilidad { this.state.meta.loading ? <i className="fa fa-spinner fa-spin"></i> : null }</h1>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        Horarios de Trabajo
                    </div>

                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group col-xs-12">
                                <p className="help-block">
                                    Indique los dias de la semana en los estara disponible para atender pacientes
                                    y registrar turnos.
                                </p>
                            </div>

                            <div className="col-xs-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Dia</th>
                                            <th>Trabaja?</th>
                                            <th>Horario de apertura</th>
                                            <th>Horario de cierre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dayIndex.map((index) => {
                                            let dayConfig = this.state.businessHours[index];
                                            return (
                                                <tr key={`${index}`}>
                                                    <th>{dayNames[index]}</th>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={dayConfig.enabled}
                                                            onChange={(event) => {dayConfig.enabled = event.target.checked; this.forceUpdate()}}
                                                            />
                                                    </td>
                                                    <td>
                                                        <select
                                                            disabled={!dayConfig.enabled}
                                                            required={dayConfig.enabled}
                                                            className="form-control"
                                                            value={dayConfig.startHour}
                                                            onChange={(event) => {dayConfig.startHour = event.target.value; this.forceUpdate()}}
                                                            >
                                                            {options()}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            disabled={!dayConfig.enabled}
                                                            required={dayConfig.enabled}
                                                            className="form-control"
                                                            value={dayConfig.endHour}
                                                            onChange={(event) => {dayConfig.endHour = event.target.value; this.forceUpdate()}}
                                                            >
                                                            {options(dayConfig.startHour)}
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>

                            <button type="submit" className="btn btn-default" disabled={this.state.meta.loading}>
                                Guardar { this.state.meta.loading ? <i className="fa fa-spinner fa-spin"></i> : null }
                            </button>
                        </form>
                    </div>
                </div>


                <div className="panel panel-default">
                    <div className="panel-heading">
                        Ausente por vacaciones
                    </div>

                    <div className="panel-body">
                        <form onSubmit={this.handleOooSubmit.bind(this)}>
                            <div className="form-group col-xs-12">
                                <p className="help-block">
                                    Indique los dias en los que no se atendera a ningun paciente.
                                </p>
                            </div>

                            <div className="col-xs-6 form-group">
                                <label>Desde</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    value={this.state.oooDates.start}
                                    onChange={(event) => {this.state.oooDates.start = event.target.value; this.forceUpdate();}}
                                    />
                            </div>
                            <div className="col-xs-6 form-group">
                                <label>Hasta</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    min={this.state.oooDates.start}
                                    value={this.state.oooDates.end}
                                    onChange={(event) => {this.state.oooDates.end = event.target.value; this.forceUpdate();}}
                                    />
                            </div>

                            <div className="col-xs-12">
                                <button type="submit" className="btn btn-default" disabled={this.state.meta.loading}>
                                    Guardar { this.state.meta.loading ? <i className="fa fa-spinner fa-spin"></i> : null }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
