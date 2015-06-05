import React from 'react/addons';
import Tooth from './Tooth.react.js';

import {right, left, TOOTH_STATES} from '../../constants/odontogramConstants.js';


// TODO: (app wide)
// - Make the searchPatients component to use a PatientStore so we
// can use the searched and selected patient accross the app, this
// will enable to care an already selected patient comming for example
// from an Appointment
// - Make the odontogram to be loaded by default with that patients
// odontogram
// - Add the data points for creating and deleting
// - (we are almost there)
export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);

        this.teethState = props.teethState;

        this.state = {
            activeToothNumber: left[0][0],
            activeToothZone: 'top'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.teethState = nextProps.teethState;
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
        var teethState = this.teethState;

        if (!teethState[toothNumber]) {
            teethState[toothNumber] = {}
        }

        if (!teethState[toothNumber][toothZone]) {
            teethState[toothNumber][toothZone] = {}
        }

        teethState[toothNumber][toothZone][stateId] = !teethState[toothNumber][toothZone][stateId];

        this.props.onChange(teethState)
    }

    isStateChecked(stateId) {
        try {
        return this.teethState[this.state.activeToothNumber][this.state.activeToothZone][stateId]
        } catch(e) {
            return false;
        }
    }

    render() {
        var hasActiveZone = (toothNumber) => {
            if (this.state.activeToothNumber !== toothNumber) {
                return ''
            }

            return this.state.activeToothZone
        }

        var getToothZonesToMark = (toothNumber) => {
            try {
                var toothState = this.teethState[toothNumber];
                var activeZones = Object.keys(toothState).filter((zone) => {
                    var states = toothState[zone];
                    var activeStates = Object.keys(states).filter((stateId) => {
                        return !!states[stateId];
                    });

                    return !!activeStates.length
                });

                return activeZones
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


// Prop Types
Odontogram.propTypes = {
    teethState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.isRequired
};

// Default props
Odontogram.defaultProps = {
    activeZone: {},
    onChange: function() {}
};
