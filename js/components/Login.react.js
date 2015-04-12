import React from 'react/addons';
import ReactMixin from 'react-mixin';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
    }

    login(event) {
        event.preventDefault();
        console.log('login attempt!', this.state);
    }

    render() {
        return (
            <form onSubmit={this.login.bind(this)}>
                LOGIN
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
                <button type="submit">Iniciar Sesion</button>
            </form>
        );
    }
}


ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
