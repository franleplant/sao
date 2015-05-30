import React from 'react/addons';
import ReactMixin from 'react-mixin';

export default class Audit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.show) return <div></div>;

        return (
            <fieldset className="">
                <div className="form-group">
                    <label>Creacion</label>
                    <input
                        className="form-control"
                        type="text"
                        disabled
                        value={this.props.created}
                        />
                </div>
                <div className="form-group">
                    <label>Ultima edicion</label>
                    <input
                        className="form-control"
                        type="text"
                        disabled
                        value={this.props.edited}
                        />
                </div>

                <button
                    onClick={this.props.onDelete}
                    type="button"
                    className="btn btn-danger pull-right"
                    >
                        Borrar
                </button>
            </fieldset>
        );
    }
}
