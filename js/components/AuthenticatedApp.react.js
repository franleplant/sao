import React from 'react/addons';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';
import sessionStore from '../stores/sessionStore.js';
import loginActions from '../actions/loginActions.js';
import Firebase from 'firebase';

var ref = new Firebase("https://<your-firebase>.firebaseio.com/");

export default class AuthenticatedApp extends React.Component {
    constructor() {
        super()
        this.state = {
            username: sessionStore.getUsername() || 'usuario@prueba.com'
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
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a className="navbar-brand" href="#">SAO</a>
                        </div>

                        {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                            <ul className="nav navbar-nav">
                                <li><Link to="home">Home</Link></li>
                                <li><Link to="login">Login</Link></li>
                                <li><Link to="registrarse">Signup</Link></li>
                                <li><Link to="pacientes">Pacientes</Link></li>
                                <li><Link to="registrarse">Signup</Link></li>
                            </ul>


                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <p
                                        className="navbar-text"
                                        >
                                        {this.state.username}
                                    </p>
                                </li>
                                <li>
                                    <button
                                        onClick={this.logout.bind(this)}
                                        type="button"
                                        className="btn btn-default navbar-btn"
                                        >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
}
