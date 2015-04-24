import React from 'react/addons';
import {TextField, RaisedButton, DatePicker} from 'material-ui';

export default class PatientForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <TextField floatingLabelText="Nombre y Apellido" />
                <br/>
                <TextField floatingLabelText="DNI"/>
                <br/>
                <DatePicker
                    hintText="Fecha de Nacimiento"
                    mode="landscape"/>
                <br/>
                <TextField floatingLabelText="Localidad"/>
                <br/>
                <TextField floatingLabelText="Direccion"/>
                <br/>
                <TextField floatingLabelText="Obra Social"/>
                <br/>
                <TextField floatingLabelText="Numero de Socio"/>
                <br/>
                <TextField floatingLabelText="Plan"/>
                <br/>
                <RaisedButton label="Aceptar" secondary={true} />
                <br/>
                <RaisedButton label="Borrar!" primary={true} />
            </form>
        );
    }
}
