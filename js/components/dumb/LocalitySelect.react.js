import React from 'react/addons';
import ReactMixin from 'react-mixin';

import argutils from '../../argutils.js';


/**
 * @description
 * Component for selecting a locality withing Argentina
 */
export default class LocalitySelect extends React.Component {
    constructor(props) {
        super(props);
        this._provinceList = argutils.provinces;
        this.state = {
            selectedProvince: ''
        }

        if (this.props.defaultValue) {
            this.setSelectedLocality(this.props.defaultValue)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue) {
            this.setSelectedLocality(nextProps.defaultValue)
        }
    }

    setSelectedLocality(key) {
        // Find the right locality:
        var locality = argutils.getLocalityByKey(key);
        // Set the selected province
        this.setState({
            selectedProvince: locality.prv_nombre
        });

    }

    render() {

        var provinceOptions = this._provinceList.map(function(provinceName){
            return <option key={provinceName} value={provinceName}>{provinceName}</option>
        });


        var localityList = argutils.byProvince(this.state.selectedProvince);


        var key = 1;
        // TODO:Slowness problems
        var localityOptions = localityList.map(function(locality) {
            return <option
                    key={key++}
                    value={locality.loc_cpostal + '__' + locality.loc_nombre}
                    >
                    {locality.loc_nombre + ' CP '  + locality.loc_cpostal}
                </option>
        })

        //TODO: it doesnt work when editing because the prvince needs to be setted first
        //work on it!
        return (
            <div>
                <div className="form-group">
                    <label>Provincia</label>
                    <select
                        ref="provinceSelect"
                        className="form-control"
                        valueLink={this.linkState('selectedProvince')}
                        required
                        >

                        <option key={'empty'} value="" disabled>Seleciona una Provincia</option>
                        {provinceOptions}
                    </select>
                </div>

                <div className="form-group">
                    <label>Localidad</label>
                    <select
                        ref="localitySelect"
                        className="form-control"
                        {...this.props}
                        required
                        >
                        <option key={'empty'} value="" disabled>Seleciona una Localidad</option>
                        {localityOptions}
                    </select>
                </div>
            </div>
        );
    }
}

ReactMixin(LocalitySelect.prototype, React.addons.LinkedStateMixin);
