import React from 'react/addons';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';

const USER_TAB = 'user';
const SHARE_TAB = 'share';

export default class AccountManagement extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;

        var path = context.router.getCurrentPath()
        var activeTab = path.indexOf('compartir') !== -1 ? SHARE_TAB : USER_TAB;

        this.state = {
            activeTab: activeTab
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    onTabClick(tab) {
        this.setState({
            activeTab: tab
        })
    }

    render() {
        return (
            <div className="row">
                <ul className="nav nav-tabs" ref="nav">
                    <li role="presentation" className={this.state.activeTab === USER_TAB ? 'active' : null}>
                        <Link to="administrarUsuario" onClick={this.onTabClick.bind(this, USER_TAB)}>Usuario</Link>
                    </li>
                    <li role="presentation" className={this.state.activeTab === SHARE_TAB ? 'active' : null}>
                        <Link to="administrarCompartir" onClick={this.onTabClick.bind(this, SHARE_TAB)}>Compartir</Link>
                    </li>
                </ul>


                <div className="container">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
}


AccountManagement.contextTypes = {
    router: React.PropTypes.func
}
