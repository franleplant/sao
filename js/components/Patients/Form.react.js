import React from 'react/addons';
import {TextField, RaisedButton, DatePicker} from 'material-ui';
import {Typeahead} from 'react-typeahead';
import Firebase from 'firebase';
var OSref = new Firebase('https://luminous-fire-4753.firebaseio.com/OS');



export default class PatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OSoptions: []
        }

        OSref.on('value', (snapshot) => {
            var data = snapshot.val();

            var options = [];
            for (var id in data) {
                options.push(data[id].name)
            }

            this.setState({
                OSoptions: options
            });
        })
    }



    render() {
        return (
            <form>
                <div className="form-group">
                    <label>Nombre y Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo: Juanito Perez"
                        required
                        />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Ejemplo: juan_perez@pokemart.com.ar"
                        />
                </div>

                <div className="form-group">
                    <label>DNI</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ejemplo: 123456789"
                        required
                        />
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        required
                        />
                </div>

                <div className="form-group">
                    <label>Localidad</label>
                    <input type="text" className="form-control" placeholder="Localidad"/>
                </div>

                <div className="form-group">
                    <label>Direccion</label>
                    <input type="text" className="form-control" placeholder="Av Siempre Viva 123"/>
                </div>

                <div className="form-group">
                    <label>Obra Social</label>
                    <Typeahead
                        options={this.state.OSoptions}
                        maxVisible={2}
                        placeholder="Obra Social"
                        customClasses={{input: 'form-control'}}
                    />
                </div>

                <div className="col-md-offset-1">
                    <div className="form-group">
                        <label>Numero de Socio</label>
                        <input type="text" className="form-control" placeholder="Numero de Socio"/>
                    </div>

                    <div className="form-group">
                        <label>Plan</label>
                        <input type="text" className="form-control" placeholder="Plan"/>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Aceptar</button>
                <button type="button" className="btn btn-danger">Borrar</button>
            </form>
        );
    }
}
