import React from 'react/addons';
import ReactMixin from 'react-mixin';
import router from '../../router.js';
import {Link} from 'react-router';


export default class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordConfirmation: ''
        }
    }

    triggerChange(user) {
        this.props.onChange(user)
    }

    onEmailChange(event) {
        this.props.user.email = event.target.value;
        this.triggerChange(this.props.user);
    }

    onPasswordChange(event) {
        this.props.user.password = event.target.value;
        this.triggerChange(this.props.user);
    }

    onPasswordConfirmationChange(event) {

        this.setState({
            passwordConfirmation: event.target.value
        }, () => {

            var password = React.findDOMNode(this.refs.password).value;
            var passwordConfirmationDOM = React.findDOMNode(this.refs.passwordConfirmation);
            var passwordConfirmation = passwordConfirmationDOM.value;

            if (password && password !== passwordConfirmation ) {

                passwordConfirmationDOM.setCustomValidity('La clave ingresada no es igual a la primera');
                // reportValidy is throwing a weird HTML error that I cannot get
                // rid of and it looks like a weird interaction between react and the DOM
                passwordConfirmationDOM.form.reportValidity()
            } else {
                passwordConfirmationDOM.setCustomValidity('');
            }
        })
    }

    onNameChange(event) {
        this.props.user.name = event.target.value;
        this.triggerChange(this.props.user);
    }

    onCCnameChange(event) {
        this.props.user.CCname = event.target.value;
        this.triggerChange(this.props.user);
    }

    onCCtypeChange(event) {
        this.props.user.CCtype = event.target.value;
        this.triggerChange(this.props.user);
    }

    onCCnumberChange(event) {
        this.props.user.CCnumber = event.target.value;
        this.triggerChange(this.props.user);
    }

    onCCexpirationChange(event) {
        this.props.user.CCexpiration = event.target.value;
        this.triggerChange(this.props.user);
    }

    onCCsecurityCodeChange(event) {
        this.props.user.CCsecurityCode = event.target.value;
        this.triggerChange(this.props.user);
    }

    render() {
        var props = this.props;
        var user = this.props.user;

        return (
            <form onSubmit={props.submit}>
                <h1>Crear Cuenta</h1>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="username"
                        placeholder="email"
                        required
                        value={user.email}
                        onChange={this.onEmailChange.bind(this)}
                        />
                </div>

                <fieldset>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            ref="password"
                            placeholder="contraseña"
                            required
                            value={user.password}
                            onChange={this.onPasswordChange.bind(this)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="passwordConfirmation"
                            ref="passwordConfirmation"
                            placeholder="contraseña"
                            required
                            value={this.state.passwordConfirmation}
                            onChange={this.onPasswordConfirmationChange.bind(this)}
                            />
                    </div>
                </fieldset>

                <div className="form-group">
                    <label>Nombre y Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Ej: Homero Simpson"
                        required
                        value={user.name}
                        onChange={this.onNameChange.bind(this)}
                        />
                </div>


                <fieldset>
                    <h3>Tarjeta de Credito</h3>

                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="CCname"
                            placeholder="Ingrese el nombre que figura en su tarjeta"
                            required
                            value={user.CCname}
                            onChange={this.onCCnameChange.bind(this)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Tipo</label>
                        <select
                            className="form-control"
                            name="CCtype"
                            required
                            defaultValue="default"
                            value={user.CCtype}
                            onChange={this.onCCtypeChange.bind(this)}
                            >
                                <option value="default" disabled>Elija una</option>
                                <option value="visa">Visa</option>
                                <option value="amex">American Express</option>
                                <option value="master">Master Card</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Numero</label>
                        <input
                            type="text"
                            className="form-control"
                            name="CCnumber"
                            placeholder="Ingrese el numero de su tarjeta"
                            required
                            value={user.CCnumber}
                            onChange={this.onCCnumberChange.bind(this)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Fecha de vencimiento</label>
                        <input
                            type="text"
                            className="form-control"
                            name="CCexpiration"
                            placeholder="Ingrese MMAAAA donde MM significa el mes (ej: 01, 02, 11, 12), y AAAA significa el año (ej: 2014, 1988)"
                            required
                            maxLength="6"
                            value={user.CCexpiration}
                            onChange={this.onCCexpirationChange.bind(this)}
                            />
                    </div>

                    <div className="form-group">
                        <label>Codigo de Seguridad</label>
                        <input
                            type="password"
                            className="form-control"
                            name="CCsecurityCode"
                            placeholder="Codigo de Seguridad"
                            required
                            value={user.CCsecurityCode}
                            onChange={this.onCCsecurityCodeChange.bind(this)}
                            />
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={props.loading}
                    >
                    Crear Cuenta
                    <i className="fa fa-spinner" hidden={!props.loading}></i>
                </button>

                <p>Si ya tenes cuenta, <Link to="login">inicia sesion</Link> </p>
            </form>
        );
    }
}

UserForm.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
};

UserForm.defaultProps = {
    onChange: function() {},
    submit: function() {},
    loading: false,
    user: {
        email: '',
        password: '',
        name: '',
        CCname: '',
        CCtype: '',
        CCnumber: '',
        CCexpiration: '',
        CCsecurityCode: ''
    }
};
