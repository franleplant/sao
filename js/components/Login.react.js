import React from 'react/addons';
import ReactMixin from 'react-mixin';
import login from '../login.js';
import router from '../router.js';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
    }

    goToSignup(event) {
        event.preventDefault();
        router.transitionTo('/registrarse');
    }

    login(event) {
        event.preventDefault();
        console.log('login attempt!', this.state);
        login.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.login.bind(this)}>
                LOGIN
                <div className="form-group">
                    <input
                        type="email"
                        required
                        name="username"
                        placeholder="Username"
                        valueLink={this.linkState('username')}
                        />
                    <input
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                        valueLink={this.linkState('password')}
                        />
                </div>
                <button type="submit">Iniciar Sesion</button>
                <p>Si aun no tenes cuenta, <a href="" onClick={this.goToSignup.bind(this)}>creala</a></p>
            </form>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
