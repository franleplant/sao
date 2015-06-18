import React from 'react/addons';
import ReactMixin from 'react-mixin';
import UserForm from './UserForm.react.js';
import userActions from '../../actions/userActions.js';
import userStore from '../../stores/userStore.js';

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        this.state = userStore.getState();
    }

    componentDidMount() {
        userStore.onChange(this._onChange);

        userActions.get();
        this.setState({
           loading: true
        })
    }

    componentWillUnmount() {
        userStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var newState = userStore.getState();
        this.setState(newState);
        this.setState({
           loading: false
        })
    }

    onUserFormChange(user) {
        this.setState({
            user: user
        })
    }

    submit() {
        event.preventDefault();
        userActions.update(this.state.user);
        this.setState({
           loading: true
        })
    }

    render() {
        return (
            <div>
                <h1>Mi cuenta <i className="fa fa-spinner fa-spin" hidden={!this.state.loading}></i></h1>
                <div className="panel panel-default">
                    <div className="panel-body">

                        <UserForm
                            onChange={this.onUserFormChange.bind(this)}
                            loading={this.state.loading}
                            submit={this.submit.bind(this)}
                            user={this.state.user}
                            hidePassword={true}
                            editMode={true}
                            />

                    </div>
                </div>
            </div>
        );
    }
}
