import React from 'react';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';

import App from './components/App.react';
import Login from './components/Login.react';
import Signup from './components/Signup.react';
import Home from './components/Home.react';
import sessionStore from './stores/sessionStore.js';

var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="registrarse" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

export default Router.create({routes});


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
            <header>
                NAVIGATION!
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="login">Login</Link></li>
                    <li><Link to="registrarse">Signup</Link></li>
                </ul>
                Usuario: {this.state.username}
            </header>
        );
    }
}
