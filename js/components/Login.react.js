import React from 'react/addons';
import ReactMixin from 'react-mixin';
import login from '../login.js';
import router from '../router.js';
import Firebase from 'firebase';
import loginActions from '../actions/loginActions.js';

var ref = new Firebase('https://luminous-fire-4753.firebaseio.com/');


import {TextField, RaisedButton} from 'material-ui';

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
        console.log('login attempt!', this.state);


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
                loginActions.login(authData.password.email);
            }
        });

    }


    render() {
        return (
            <form onSubmit={this.login.bind(this)}>
                <h1>LOGIN</h1>
                <TextField
                    type="email"
                    required
                    name="username"
                    placeholder="Username"
                    valueLink={this.linkState('username')}
                    />
                <br/>
                <TextField
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    valueLink={this.linkState('password')}
                    />
                <br/>
                <RaisedButton type="submit" label="Iniciar Sesion" secondary={true} disabled={this.state.loading}/>
                <i className="fa fa-spinner" hidden={!this.state.loading}></i>

                {/* TODO: This needs to be styled! */}
                <p hidden={!this.state.loginError}>
                    Las credenciales ingresadas son incorrectas, por favor
                    volve a intentarlo
                </p>
                {/*TODO: Replace this custom link with a Link element from the router*/}
                <p>Si aun no tenes cuenta, <a href="" onClick={this.goToSignup.bind(this)}>creala</a></p>
            </form>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
