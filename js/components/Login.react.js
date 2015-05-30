import React from 'react/addons';
import ReactMixin from 'react-mixin';
import login from '../login.js';
import router from '../router.js';
import Firebase from 'firebase';
import loginActions from '../actions/loginActions.js';

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

            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.login.bind(this)}>
                            <h1>Iniciar Sesion</h1>

                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="email"
                                    required
                                    valueLink={this.linkState('username')}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="password"
                                    className="form-control"
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
                            </button>

                            <i className="fa fa-spinner" hidden={!this.state.loading}></i>

                            <div
                                className="alert alert-danger"
                                role="alert"
                                hidden={!this.state.loginError}
                                >
                                Las credenciales ingresadas son incorrectas, por favor
                                volve a intentarlo
                            </div>

                            {/*TODO: Replace this custom link with a Link element from the router*/}
                            <p>Si aun no tenes cuenta, <a href="" onClick={this.goToSignup.bind(this)}>creala</a></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
