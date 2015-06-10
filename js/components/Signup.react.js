import React from 'react/addons';
import ReactMixin from 'react-mixin';
import router from '../router.js';
import {Link} from 'react-router';
import UserForm from './User/UserForm.react.js';


export default class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    onUserFormChange(user) {
        this.setState({
            user: user
        })
    }

    submit(event) {
        debugger;
        event.preventDefault();
        console.log('signup attempt!', this.state);
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>SAO <small>Sistema de Administracion Odontologico</small></h1>
                </div>
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-body">

                            <UserForm
                                onChange={this.onUserFormChange.bind(this)}
                                loading={this.state.loading}
                                submit={this.submit.bind(this)}
                                user={this.state.user}
                                />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
