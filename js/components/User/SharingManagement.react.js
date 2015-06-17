import React from 'react/addons';
import ReactMixin from 'react-mixin';
import userActions from '../../actions/userActions.js';
import userStore from '../../stores/userStore.js';
import sessionStore from '../../stores/sessionStore.js';
import sharingPermissionStore from '../../stores/sharingPermissionStore.js';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this._onChange = this._onChange.bind(this);

        this.state = sharingPermissionStore.getState();
    }

    componentDidMount() {
        sharingPermissionStore.onChange(this._onChange);

        userActions.getPermissionList(sessionStore.getId());
    }

    componentWillUnmount() {
        sharingPermissionStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var newState = sharingPermissionStore.getState();
        this.setState(newState);
    }

    removeActivePermission(permissionId) {
        userActions.removeActivePermission(permissionId);
    }

    submit() {
        event.preventDefault();
        userActions.shareTo(sessionStore.getId(), this.state.passiveUser);
    }

    render() {
        return (
            <div>
                <h1>Compartir y administrar permisos { this.state.meta.loading ? <i className="fa fa-spinner fa-spin"></i> : null }</h1>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        Compartir
                    </div>
                    <div className="panel-body">

                        <form onSubmit={this.submit.bind(this)}>
                            <div className="form-group col-xs-12">
                                <p className="help-block">
                                    Ingrese la direccion de email del usuario a quien desear darle permiso para ver y editar sus
                                    pacientes, turnos, registros de consultas y precios.
                                </p>
                            </div>
                            <div className="form-group col-xs-10">
                                <label className="sr-only">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="carlos@salguero.com"
                                    value={this.state.passiveUser}
                                    onChange={(event) => {this.setState({passiveUser: event.target.value})}}
                                    />
                            </div>


                            <div className="form-group col-xs-2">
                                <button type="submit" className="btn btn-default">Compartir</button>
                            </div>
                        </form>

                        <div className="col-xs-12">
                            <h3>Usuarios con acceso a mis datos</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Nombre</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.activePermissions
                                            .map((permission, index) => {
                                                return (
                                                    <tr key={`activePermissionList${index}`}>
                                                        <td>{permission.passiveUser.email}</td>
                                                        <td>{permission.passiveUser.name}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={this.removeActivePermission.bind(this, permission.permissionId)}
                                                                >
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    }





                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>



                <div className="panel panel-default">
                    <div className="panel-heading">
                        Otros Usuarios
                    </div>
                    <div className="panel-body">
                        <div className="col-xs-12">
                            <h3>Usuarios que han compartido sus datos</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.passivePermissions
                                            .map((permission, index) => {
                                                return (
                                                    <tr key={`passivePermissionList${index}`}>
                                                        <td>{permission.activeUser.email}</td>
                                                        <td>{permission.activeUser.name}</td>
                                                    </tr>
                                                );
                                            })
                                    }





                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}






