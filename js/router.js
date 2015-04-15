import React from 'react';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';

import App from './components/App.react';
import Login from './components/Login.react';
import Signup from './components/Signup.react';
import Home from './components/Home.react';
import Patients from './components/Patients.react';
import sessionStore from './stores/sessionStore.js';

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="registrarse" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <Route name="pacientes" handler={Patients}/>
  </Route>
);

export default Router.create({routes});


import {Toolbar} from 'material-ui';

export class Navigation extends React.Component {
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
            <Toolbar>
                    <Link to="home">Home</Link>
                    <Link to="login">Login</Link>
                    <Link to="registrarse">Signup</Link>
                    <Link to="pacientes">Pacientes</Link>
                Usuario: {this.state.username}
            </Toolbar>
        );
    }
}
