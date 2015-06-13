import React from 'react/addons';
import ReactMixin from 'react-mixin';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        //this.state = userStore.getState();
    }

    componentDidMount() {
        //userStore.onChange(this._onChange);

        //userActions.get();
    }

    componentWillUnmount() {
        //userStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        //var newState = userStore.getState();
        //this.setState(newState);
    }

    //onUserFormChange(user) {
        //this.setState({
            //user: user
        //})
    //}

    submit() {
        event.preventDefault();
        //userActions.update(this.state.user);
        //this.setState({
           //loading: true
        //})
    }

    render() {
        return (
            <div>
                <h1>Compartir</h1>
                <div className="panel panel-default">
                    <div className="panel-body">


                    </div>
                </div>
            </div>
        );
    }
} 
