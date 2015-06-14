import React from 'react/addons';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';
import sessionStore from '../stores/sessionStore.js';
import loginActions from '../actions/loginActions.js';
import Firebase from 'firebase';
import patientActions from '../actions/patientActions.js';
import careActions from '../actions/careActions.js';
import InformationDomainSelector from './informationDomianSelector.react.js';

var ref = new Firebase('https://luminous-fire-4753.firebaseio.com/');

export default class AuthenticatedApp extends React.Component {
    static willTransitionTo(transition) {
        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
        // ENABLE THIS TO ADD AUTHORIZATION
        if (!sessionStore.isLoggedIn()) {
            transition.redirect('/login');
        }
    }

    constructor() {
        super()
        this.state = {
            username: sessionStore.getUsername() || 'algo fallo'
        }
    }

    logout() {
        loginActions.logout();
    }

    // TODO: add componentDidUnmount onchange cleaning!
    componentDidMount() {
          sessionStore.onChange(() => {
            this.setState({username: sessionStore.getUsername()})
          });
    }

    onNewCareClick() {
        patientActions.clean();
        careActions.clean();

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>

                            <a className="navbar-brand" href="#">SAO</a>
                        </div>

                        {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                        <div className="collapse navbar-collapse" id="main-navbar">

                            <ul className="nav navbar-nav">
                                <li><Link to="home">Home</Link></li>
                                <li><Link to="pacientes">Pacientes</Link></li>
                                <li><Link to="crearConsulta" onClick={this.onNewCareClick.bind(this)}>Atender</Link></li>
                            </ul>


                            <button
                                onClick={this.logout.bind(this)}
                                type="button"
                                className="btn btn-default navbar-btn navbar-right"
                                >
                                Logout
                            </button>

                            <InformationDomainSelector/>

                            <p className="navbar-text navbar-right" style={{ marginRight: '10px'}}>
                                <Link to="administrarUsuario" className="navbar-link navbar-right">{this.state.username}</Link>
                            </p>
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

AuthenticatedApp.contextTypes = {
    router: React.PropTypes.func
}
