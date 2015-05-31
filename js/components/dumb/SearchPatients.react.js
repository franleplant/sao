import React from 'react/addons';
import patientResource from '../../patientResource.js';

export default class SearchPatients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            searchResult: [],
            selectedPatientId: '',
            selectedPatientValue: '',
            patient: {}
        }
    }

    onKeyHandler(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.search();
            return;
        }
    }

    search() {
        this.setState({
            loading: true
        })

        patientResource
            .search(this.state.searchText)
            .then((result) => {
                this.setState({
                    searchResult: result,
                    loading: false
                })
            })
    }

    selectResult(patient) {

        this.setState({
            selectedPatientId: patient.patientId,
            searchText: patient.name,
            // Clean up the result list
            searchResult: [],
            patient: patient
        })

        // The following is for handling the outside,
        // run the onChange handler
        var onChangeHandler = this.props.onChange;
        if (!onChangeHandler) return

        onChangeHandler(patient.patientId);
    }

    onInputChange(event) {
        this.setState({
            searchResult: [],
            searchText: event.target.value
        })
    }

     componentWillReceiveProps(newProps) {
        if (!newProps.value) return;


        patientResource
            .getById(newProps.value)
            .catch(console.log.bind(console))
            .then((patient) => {
                this.setState({
                    selectedPatientId: newProps.value,
                    searchText: patient.name,
                    patient: patient
                });
            })


     }

    render() {
        var resultList = this.state.searchResult
                            .map((patient, index) => {
                                return (
                                    <a
                                        key={patient.patientId}
                                        className="list-group-item"
                                        onClick={this.selectResult.bind(this, patient)}
                                        >
                                        {patient.name + ',  ' + patient.DNI + ',  ' + patient.address + ',  ' + patient.tel}
                                    </a>
                                )
                            })

        var resultOrSelectedPatient;

        if (resultList.length) {
            resultOrSelectedPatient = (
                    <div className="list-group">
                        {resultList}
                    </div>
                )
        } else if (this.state.patient.name) {
            //no results and a selected patient
            resultOrSelectedPatient = (
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            disabled
                            rows="3"
                            value={
                                'DNI: ' + this.state.patient.DNI  + '\n' +
                                'Tel: ' + this.state.patient.tel  + '\n' +
                                'Obra Social: ' + this.state.patient.osName
                            }
                            >
                        </textarea>
                    </div>
                );
        }


        return (
            <div className="row" onKeyDown={this.onKeyHandler.bind(this)}>
                <div className="form-group col-xs-6">
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Ingresa nombre, appellido o dni"
                        name="searchInput"
                        ref="searchInput"
                        autoComplete="off"
                        onChange={this.onInputChange.bind(this)}
                        value={this.state.searchText}
                        />

                    {resultOrSelectedPatient}
                </div>

                <div className="form-group col-xs-1">
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.search.bind(this)}
                        >
                        Buscar
                        { this.state.loading ? <i className="fa fa-spinner"></i> : null}
                    </button>
                </div>
            </div>
        )
    }
}
