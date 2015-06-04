import React from 'react/addons';
import ReactMixin from 'react-mixin';

import PracticeSelect from '../dumb/PracticeSelect.react.js';

/**
 * @description
 * The main pourpose of this component is to display and edit
 * a list of practices and comments for those practices, typically used
 * inside a Care.
 *
 *
 * NOTE: This component is one the better constructed in the app among all
 * dumb components, if you noticed, the interface is the typical value and onChange
 * of react's stateless components, so its pretty easy to port it and use it
 *
 */
export default class CarePracticesForm extends React.Component {
    constructor(props) {
        super(props);

        this.carePractices = props.value;
    }

    componentWillReceiveProps(nextProps) {
        this.carePractices = nextProps.value;
    }

    addNewCarePractice() {
        this.carePractices.push({
                practiceId: '01.01',
                notes: ''
        })

        this.props.onChange(this.carePractices);
    }

    removeCarePractice(index, event) {
        var carePractices = this.carePractices;
        carePractices.splice(index, 1);

        this.props.onChange(carePractices);
    }

    onCarePracticeIdChange(index, event) {
        var carePractices = this.carePractices;
        carePractices[index].practiceId = event.target.value;

        this.props.onChange(carePractices);
    }

    onCarePracticeNoteChange(index, event) {
        var carePractices = this.carePractices;
        carePractices[index].notes = event.target.value;

        this.props.onChange(carePractices);
    }

    render() {
        return (
            <fieldset>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Practica</th>
                            <th>Notas</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.carePractices.map((carePractice, index) => {
                                return (
                                    <tr key={'carePractices' + index}>
                                        <td className="col-md-4">
                                            <PracticeSelect
                                                value={carePractice.practiceId}
                                                onChange={this.onCarePracticeIdChange.bind(this, index)}
                                                />
                                        </td>
                                        <td>
                                            <input
                                                className="form-control"
                                                value={carePractice.notes}
                                                onChange={this.onCarePracticeNoteChange.bind(this, index)}
                                                placeholder="Notas"
                                                />

                                        </td>
                                        <td className="col-md-1">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={this.removeCarePractice.bind(this, index)}
                                                >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="3">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    onClick={this.addNewCarePractice.bind(this)}
                                    >
                                    Nueva Practica
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </fieldset>
        );
    }
}


// Prop Types
CarePracticesForm.propTypes = {
    value: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
};

// Default props
CarePracticesForm.defaultProps = {
    value: [],
    onChage: function() {}
};

/// Perhaps a good default Value could be this:
 //this.state = {
            //carePractices: [{
                //practiceId: '01.01',
                //notes: 'Se realizo tal y tal cosa en pieza 21'
            //},{
                //practiceId: '01.02',
                //notes: 'Se realizo tal y tal cosa en pieza 21'
            //},{
                //practiceId: '02.01',
                //notes: 'Se realizo tal y tal cosa en pieza 21'
            //}]
        //}
