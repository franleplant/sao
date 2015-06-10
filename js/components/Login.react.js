import React from 'react/addons';
import ReactMixin from 'react-mixin';
import login from '../login.js';
import router from '../router.js';
import Firebase from 'firebase';
import loginActions from '../actions/loginActions.js';
import {Link} from 'react-router';

var ref = new Firebase('https://luminous-fire-4753.firebaseio.com/');

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false,
            loginError: false
        };
    }

    goToSignup(event) {
        event.preventDefault();
        router.transitionTo('/registrarse');
    }

    login(event) {
        event.preventDefault();

        this.setState({
            loading: true,
            loginError: false
        });

        ref.authWithPassword({

            email    : this.state.username,
            password : this.state.password

        }, (error, authData) => {
            this.setState({
                loading:false
            });

            if (error) {
                // TODO: We are not catching network problems!
                this.setState({loginError: true});
            } else {
                loginActions.login(authData);
            }
        });

    }


    render() {
        return (
            <div className="col-xs-12">
                <div className="page-header">
                    <h1>SAO <small>Sistema de Administracion Odontologico</small></h1>
                </div>
                <div className="col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form onSubmit={this.login.bind(this)}>
                                <h1>Iniciar Sesion</h1>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="username"
                                        placeholder="email"
                                        required
                                        valueLink={this.linkState('username')}
                                        />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="contraseña"
                                        required
                                        valueLink={this.linkState('password')}
                                        />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={this.state.loading}
                                    >
                                    Iniciar Sesion
                                    <i className="fa fa-spinner" hidden={!this.state.loading}></i>
                                </button>


                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                    hidden={!this.state.loginError}
                                    >
                                    Las credenciales ingresadas son incorrectas, por favor
                                    volve a intentarlo
                                </div>

                                <p>Si aun no tenes cuenta, <Link to="registrarse">creala</Link> </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
