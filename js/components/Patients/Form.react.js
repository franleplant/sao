import React from 'react/addons';
import {TextField, RaisedButton, DatePicker} from 'material-ui';

export default class PatientForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <TextField hintText="Nombre y Apellido"/>
                <br/>
                <TextField hintText="DNI"/>
                <br/>
                <DatePicker
                    hintText="Fecha de Nacimiento"
                    mode="landscape"/>
                <br/>
                <TextField hintText="Localidad"/>
                <br/>
                <TextField hintText="Direccion"/>
                <br/>
                <TextField hintText="Obra Social"/>
                <br/>
                <TextField hintText="Numero de Socio"/>
                <br/>
                <TextField hintText="Plan"/>
                <br/>
                <RaisedButton label="Aceptar" secondary={true} />
                <br/>
                <RaisedButton label="Borrar!" primary={true} />
            </form>
        );
    }
}
