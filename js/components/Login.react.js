import React from 'react/addons';
import ReactMixin from 'react-mixin';
import login from '../login.js';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
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
            </form>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
