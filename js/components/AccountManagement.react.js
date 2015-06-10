import React from 'react/addons';
import ReactMixin from 'react-mixin';

export default class AccountManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-danger">
             ACCOUNT MANAGMENT
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label>Creacion</label>
                            <input
                                className="form-control"
                                type="text"
                                disabled
                                />
                        </div>
                        <button
                            type="button"
                            className="btn btn-danger pull-right"
                            >
                                Borrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
