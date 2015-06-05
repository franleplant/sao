import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Tooth from './Tooth.react.js';

import {right, left, TOOTH_STATES} from '../../constants/odontogramConstants.js';


// TODO: make this component stateless :)
export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeToothNumber: 21,
            activeToothZone: 'top',
            teethState: {
                //toothNumber
                18: {
                    //zone: [StateId: bool, StateId: bool]
                    'center': {
                        3: true,
                        4: true
                    },
                    'left': {
                        1: true
                    }
                },
                17: {
                    'left': {
                        1: true
                    }
                }
            }
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

    onStateClick(stateId, event) {
        var toothNumber = this.state.activeToothNumber;
        var toothZone = this.state.activeToothZone;
        var teethState = this.state.teethState;

        if (!teethState[toothNumber]) {
            teethState[toothNumber] = {}
        }

        if (!teethState[toothNumber][toothZone]) {
            teethState[toothNumber][toothZone] = {}
        }

        teethState[toothNumber][toothZone][stateId] = !teethState[toothNumber][toothZone][stateId];
        this.setState({
            teethState: teethState
        })
    }

    isStateChecked(stateId) {
        try {
        return this.state.teethState[this.state.activeToothNumber][this.state.activeToothZone][stateId]
        } catch(e) {
            return false;
        }
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

        var getToothZonesToMark = (toothNumber) => {
            try {
                return Object.keys(this.state.teethState[toothNumber]);
            } catch(e) {
                return [];
            }
        }

        var rowCreator = (row) => {
            return row.map((toothNumber, index) => {
                return (
                    <Tooth
                        key={`toothNumber ${toothNumber}`}
                        toothNumber={toothNumber}
                        activeZone={hasActiveZone(toothNumber)}
                        markedZones={getToothZonesToMark(toothNumber)}
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
                        <div className="panel panel-default" style={{marginBottom: '0px', marginTop: '20px'}}>
                            <div className="panel-body">
                                <div className="row">
                                    {
                                        [0,1,2,3].map((index) => {
                                            let lowerIndex =  0 + index * 5;
                                            let upperIndex = 5 + index * 5;

                                            return (
                                                <fieldset className="col-xs-3" key={`toothState fieldset ${index}`}>
                                                    {
                                                        TOOTH_STATES
                                                            .slice(lowerIndex, upperIndex)
                                                            .map((state, index) => {
                                                                let stateId =  lowerIndex + index;
                                                                return (
                                                                        <div className="checkbox" key={`toothState ${index}`}>
                                                                            <label>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={this.isStateChecked(stateId)}
                                                                                    onChange={this.onStateClick.bind(this, stateId)}
                                                                                    />
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
                    </div>
                </div>
        );
    }
}


ReactMixin(Odontogram.prototype, React.addons.LinkedStateMixin);
