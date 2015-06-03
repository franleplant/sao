import React from 'react/addons';
import ReactMixin from 'react-mixin';

export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {


        return (
                <div>
                        Se usa el mismo y se renueva cada 6 meses aprox
                </div>
        );
    }
}


ReactMixin(Odontogram.prototype, React.addons.LinkedStateMixin);
