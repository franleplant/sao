import React from 'react/addons';
import CareForm from './CareForm.react.js';

export default class NewCare extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
    }

    successCallback(careId) {
        this.context.router.transitionTo('editarConsulta', {careId: careId});
    }

    render() {
        return (
            <div>
                <h1>Registrar Consulta</h1>
                <CareForm
                    successCallback={this.successCallback.bind(this)}
                    />
            </div>
        );
    }
}

NewCare.contextTypes = {
    router: React.PropTypes.func
}
