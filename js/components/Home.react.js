import React from 'react/addons';
import {Link} from 'react-router';
import sessionStore from '../stores/sessionStore.js';
import {DatePicker} from 'material-ui';

export default class Home extends React.Component {
    static willTransitionTo(transition) {
        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
        // ENABLE THIS TO ADD AUTHORIZATION
        //if (!sessionStore.isLoggedIn()) {
            //transition.redirect('/login');
        //}
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>HOME!</h1>
                <DatePicker
                    defaultDate={new Date()}
                    mode="landscape"
                    />
            </div>
        );
    }
}
