import React from 'react/addons';
import {Toolbar} from 'material-ui';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';
import sessionStore from '../stores/sessionStore.js';
import loginActions from '../actions/loginActions.js';
//import login from '../login.js';
import Firebase from 'firebase';
var ref = new Firebase("https://<your-firebase>.firebaseio.com/");

export default class AuthenticatedApp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: sessionStore.getUsername()
        }
    }

    logout() {
        ref.unauth();
        loginActions.logout();
    }

    componentDidMount() {
          sessionStore.onChange(() => {
            this.setState({username: sessionStore.getUsername()})
          });
    }
    render() {
        return (
            <div>
                <Toolbar>
                        <Link to="home">Home</Link>
                        <Link to="login">Login</Link>
                        <Link to="registrarse">Signup</Link>
                        <Link to="pacientes">Pacientes</Link>
                        <button onClick={this.logout.bind(this)}>Logout</button>
                    Usuario: {this.state.username}
                </Toolbar>
                <div className="container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
}
