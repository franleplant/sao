import React from 'react/addons';
import CareForm from './CareForm.react.js';

export default class EditCare extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        this.careId = context.router.getCurrentParams().careId;
    }

    onDeleteCallback() {
        this.context.router.transitionTo('home');
    }


    render() {
        return (
            <div>
                <h1> Editar Consulta </h1>
                <CareForm careId={this.careId} onDeleteCallback={this.onDeleteCallback.bind(this)}/>
            </div>
        );
    }
}

EditCare.contextTypes = {
    router: React.PropTypes.func
}
