import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Tooth from './Tooth.react.js';

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


        //Se usa el mismo y se renueva cada 6 meses aprox
        //
        var teeth = [];

        for (var i = 0; i < (32 + 20); i++) {
            teeth.push(
                <Tooth/>
            );
        }

        return (
                <div>
                    {teeth}
                </div>
        );
    }
}


ReactMixin(Odontogram.prototype, React.addons.LinkedStateMixin);
