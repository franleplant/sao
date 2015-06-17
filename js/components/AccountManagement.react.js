import React from 'react/addons';
import Router, {Route, Link, RouteHandler, DefaultRoute} from 'react-router';

const USER_TAB = 'user';
const SHARE_TAB = 'share';
const PRICES_TAB = 'prices';

export default class AccountManagement extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;

        let path = context.router.getCurrentPath()

        let activeTab;
        if (path.indexOf('compartir') !== -1) {
            activeTab =  SHARE_TAB;
        } else if (path.indexOf('precios') !== -1) {
            activeTab =  PRICES_TAB;
        } else {
            activeTab =  USER_TAB;
        }

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
                    <li role="presentation" className={this.state.activeTab === PRICES_TAB ? 'active' : null}>
                        <Link to="administrarPrecios" onClick={this.onTabClick.bind(this, PRICES_TAB)}>Precios</Link>
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
