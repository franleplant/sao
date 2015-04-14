import React from 'react/addons';
import ReactMixin from 'react-mixin';
import router from '../router.js';


export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
    }

    goToLogin(event) {
        event.preventDefault();
        router.transitionTo('/login');
    }

    signup(event) {
        event.preventDefault();
        console.log('signup attempt!', this.state);
    }

    render() {
        return (
            <form onSubmit={this.signup.bind(this)}>
                SIGNUP
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        valueLink={this.linkState('username')}
                        />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        valueLink={this.linkState('password')}
                        />
                </div>
                <button type="submit">Crear Cuenta</button>
                <p>Si ya tenes cuenta, <a href="" onClick={this.goToLogin.bind(this)}>inicia sesion</a></p>
            </form>
        );
    }
}


ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
