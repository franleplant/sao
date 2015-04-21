import React from 'react/addons';
import {Toolbar} from 'material-ui';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';
import sessionStore from '../stores/sessionStore.js';

export default class AuthenticatedApp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: sessionStore.getUsername()
        }
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
                    Usuario: {this.state.username}
                </Toolbar>

                <RouteHandler/>
            </div>
        );
    }
}
