import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Tooth from './Tooth.react.js';

const left = [
    [18,17,16,15,14,13,12,11],
    [55,54,53,52,51],
    [85,84,83,82,81],
    [48,47,46,45,44,43,42,41]
]

const right = [
    [21,22,23,24,25,26,27,28],
    [61,62,63,64,65],
    [71,72,73,74,75],
    [31,32,33,34,35,36,37,38]
]


const TOOTH_STATES = [{
        description: 'Caries / Obt Temporal'
    },{
        description: 'Diente Incluido / Semiincluido'
    },{
        description: 'Superficie Sellada'
    },{
        description: 'Corona adaptada / Acero'
    },{
        description: 'Nucleo'
    },{
        description: 'Amalgama'
    },{
        description: 'Sin erupcionar'
    },{
        description: 'Sellante indicado'
    },{
        description: 'Corona desadaptada'
    },{
        description: 'Pontico'
    },{
        description: 'Ausente'
    },{
        description: 'Endodoncia realizada'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    },{
        description: 'Ausente'
    }
]

export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeToothNumber: 21,
            activeToothZone: 'top'
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onToothZoneClick(toothNumber, toothZone) {

        this.setState({
            activeToothNumber: toothNumber,
            activeToothZone: toothZone
        })

    }

    render() {
        //Se usa el mismo y se renueva cada 6 meses aprox
        //
        //



        var hasActiveZone = (toothNumber) => {
            if (this.state.activeToothNumber !== toothNumber) {
                return ''
            }

            return this.state.activeToothZone
        }

        var rowCreator = (row) => {
            return row.map((toothNumber, index) => {
                return (
                    <Tooth
                        key={`toothNumber ${toothNumber}`}
                        toothNumber={toothNumber}
                        activeZone={hasActiveZone(toothNumber)}
                        onClick={this.onToothZoneClick.bind(this, toothNumber)}
                        />
                )
            })
        }

        return (
                <div className="row">
                    <div className="col-xs-6">
                        <div className="row">
                            {
                                left.map((left_i, index) => {
                                    return (
                                        <div className="col-xs-12 flex-container-right" key={`left_odontogram_row ${index}`}>
                                            {
                                                rowCreator(left_i)
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="col-xs-6 flex-container">
                        <div className="row">
                            {
                                right.map((right_i, index) => {
                                    return (
                                        <div className="col-xs-12 flex-container-left" key={`right_odontogram_row ${index}`}>
                                            {
                                                rowCreator(right_i)
                                            }
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            {
                                [0,1,2,3].map((index) => {
                                    return (
                                        <fieldset className="col-xs-3" key={`toothState fieldset ${index}`}>
                                            {
                                                TOOTH_STATES
                                                    .slice(0 + index * 5, 5 + index * 5)
                                                    .map((state, index) => {
                                                        return (
                                                                <div className="checkbox" key={`toothState ${index}`}>
                                                                    <label>
                                                                        <input type="checkbox" value=""/>
                                                                        {state.description}
                                                                    </label>
                                                                </div>
                                                        );
                                                    })
                                            }
                                        </fieldset>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
        );
    }
}


ReactMixin(Odontogram.prototype, React.addons.LinkedStateMixin);
