import React from 'react/addons';
import {Link} from 'react-router';
import {Navigation} from '../router.js';
import sessionStore from '../stores/sessionStore.js';

export default class Home extends React.Component {
    static willTransitionTo(transition) {
        // This method is called before transitioning to this component. If the user is not logged in, we’ll send him or her to the Login page.
        if (!sessionStore.isLoggedIn()) {
            transition.redirect('/login');
        }
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                HOME!
                <Navigation/>
            </div>
        );
    }
}
