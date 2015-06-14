import React from 'react/addons';
import ReactMixin from 'react-mixin';
import userActions from '../actions/userActions.js';
import informationDomainStore from '../stores/informationDomainStore.js';
import sharingPermissionStore from '../stores/sharingPermissionStore.js';
import informationDomainActions from '../actions/informationDomainActions.js';
import sessionStore from '../stores/sessionStore.js';

export default class InformationDomainSelector extends React.Component {
    constructor(props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        this.state = {};
        //DI = dominios de informacion which is informationDomains in spanish
        this.state.activeDI = informationDomainStore.getState();
        this.state.listDI = [this.state.activeDI];
    }

    componentDidMount() {
        sharingPermissionStore.onChange(this._onChange);
        informationDomainStore.onChange(this._onChange);

        userActions.getPermissionList();
    }

    componentWillUnmount() {
        sharingPermissionStore.removeChangeListener(this._onChange);
        informationDomainStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        let newState = {};
        newState.activeDI = informationDomainStore.getState();

        let passivePermissions = sharingPermissionStore.getState().passivePermissions;
        let listDI = passivePermissions.map((permission) => {
            return {
                userEmail: permission.activeUser.email,
                userId: permission.activeUser.userId
            }
        })

        let mainDI = {
            userEmail: sessionStore.getUsername(),
            userId: sessionStore.getId()
        };

        newState.listDI = [mainDI].concat(listDI);
        this.setState(newState);
    }


    onChange(event) {
        let userId = event.target.value;
        let userEmail;
        this.state.listDI.forEach((di) => {
            if (di.userId === userId) {
                userEmail = di.userEmail;
            }
        })

        informationDomainActions.set(userId, userEmail)
    }

    render() {
        return (
            <form className="navbar-form navbar-right">
                <select
                    className="form-control"
                    style={{minWidth: '100px'}}
                    value={this.state.activeDI.userId}
                    onChange={this.onChange.bind(this)}
                    >
                    {
                        this.state.listDI.map((di,index) => {
                            return <option key={`diSelector${index}`} value={di.userId}>{di.userEmail}</option>
                        })
                    }
                </select>
                <abbr
                    style={{marginLeft: '5px'}}
                    title={`
                        Selector de Dominio de Informacion:
                        seleccione los datos de que Usuario
                        estara viendo/editando.
                        Los datos estan conformados por
                        pacientes, turnos, precios, y registros
                        de atencion.
                        Para mas informacion visite la seccion
                        "Mi Cuenta"
                        `}
                    >?
                </abbr>
            </form>
        );
    }
}





 
