import React from 'react/addons';
import {TextField, RaisedButton, DatePicker} from 'material-ui';

export default class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <TextField floatingLabelText="Paciente" />
                <br/>

                <DatePicker
                    hintText="Fecha del Turno"
                    mode="landscape"/>
                <br/>

                <TextField floatingLabelText="Hora del Turno" type="time"/>
                <br/>
                <TextField floatingLabelText="Profesional" disabled value="Doctor Who"/>
                <br/>
                <RaisedButton label="Aceptar" secondary={true} />
                <br/>
                <RaisedButton label="Borrar!" primary={true} />
            </form>
        );
    }
}
