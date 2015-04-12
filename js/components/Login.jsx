import React from 'react';


export default class Login extends React.Component {
    getInitialState() {
        return {username: '', password: ''};
    }

    login(event) {
        event.preventDefault();
        console.log('login attempt!', event);
        this.setState({username: 'test', password: 'test'})
    }

    render() {
        return (
            <form role=“form”>
                <div className=“form-group”>
                    <input type=“text” name="username" placeholder=“Username” />
                    <input type=“password” name="password" placeholder=“Password” />
                </div>
                <button type=“submit” onClick={this.login.bind(this)}>Submit</button>
            </form>
        );
    }
}
