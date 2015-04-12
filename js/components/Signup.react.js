import React from 'react/addons';
import ReactMixin from 'react-mixin';


export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''};
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
            </form>
        );
    }
}


ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
