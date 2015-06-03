import React from 'react/addons';
import ReactMixin from 'react-mixin';

import PracticeSelect from '../dumb/PracticeSelect.react.js';

export default class CarePracticesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            carePractices: [{
                practiceId: 123,
                notes: 'Se realizo tal y tal cosa en pieza 21'
            },{
                practiceId: 123,
                notes: 'Se realizo tal y tal cosa en pieza 21'
            },{
                practiceId: 123,
                notes: 'Se realizo tal y tal cosa en pieza 21'
            }]
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    addNewCarePractice() {
        this.state.carePractices.push({})


        this.setState({
            carePractices: this.state.carePractices
        })
    }

    render() {


        return (
            <fieldset>
                <label>Practicas</label>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Practica</th>
                            <th>Notas</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.carePractices.map((carePractice) => {
                                return (
                                    <tr>
                                        <td className="col-md-4">
                                            <PracticeSelect />
                                        </td>
                                        <td>
                                            <input
                                                className="form-control"
                                                value={carePractice.notes}
                                                />

                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="2">
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


ReactMixin(CarePracticesForm.prototype, React.addons.LinkedStateMixin);
