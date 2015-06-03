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

    care() {
        this.context.router.transitionTo('atender');
    }

    render() {
        return (
            <div>
                <h1>
                    Editar Turno
                    <button
                        className="btn btn-primary pull-right"
                        type="button"
                        onClick={this.care.bind(this)}
                        >
                        Atender
                    </button>
                </h1>
                <CareForm careId={this.careId} onDeleteCallback={this.onDeleteCallback.bind(this)}/>
            </div>
        );
    }
}

EditCare.contextTypes = {
    router: React.PropTypes.func
}
