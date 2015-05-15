import React from 'react/addons';
import ReactMixin from 'react-mixin';

import osutils from '../../osutils.js';


/**
 * @description
 * Simple component that will render a <select> element with all
 * the Obra Sociales as options :)
 */
export default class OSSelect extends React.Component {
    constructor(props) {
        super(props);
        this._OSList = osutils.getOSList();
    }

    render() {
        var OSOptions = [
            <option key={'empty'} value="" disabled>Seleciona una Obra Social</option>
        ];

        for (var OSId in this._OSList) {
            OSOptions.push(<option key={OSId} value={OSId}>{this._OSList[OSId].name}</option>)
        }

        return (
            <select
               {...this.props}
                >
                {OSOptions}
            </select>
        );
    }
}

ReactMixin(OSSelect.prototype, React.addons.LinkedStateMixin);
