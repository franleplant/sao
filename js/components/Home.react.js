import React from 'react/addons';
import {Link} from 'react-router';
import {Navigation} from '../router.js';

export default class Home extends React.Component {
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
