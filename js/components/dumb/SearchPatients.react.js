import React from 'react/addons';
import patientResource from '../../patientResource.js';
import patientActions from '../../actions/patientActions.js';
import patientStore from '../../stores/patientStore.js';
import Promise from 'bluebird';

export default class SearchPatients extends React.Component {
    constructor(props) {
        super(props);

        var patient = patientStore.getState()
        this._onChange = this._onChange.bind(this);

        this.state = {
            searchText: patient.name,
            selectedPatientId: patient.patientId,
            patient: patient,
            searchResult: []
        }
    }

    componentDidMount() {
        patientStore.onChange(this._onChange);
    }

    componentWillUnmount() {
        patientStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var patient = patientStore.getState()
        if (patient.patientId === this.state.patient.patientId) {
            return;
        }

        this.state = {
            searchText: patient.name,
            selectedPatientId: patient.patientId,
            patient: patient,
            searchResult: []
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

                if (!result.length) {
                    alert('no se han encontrado resultados')
                }
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

        // Save the selected patient in the patient store
        patientActions.set(patient.patientId, patient);

        // The following is for handling the outside,
        // run the onChange handler
        var onChangeHandler = this.props.onChange;
        if (!onChangeHandler) return

        onChangeHandler(patient.patientId, patient);
    }

    onInputChange(event) {
        this.setState({
            searchResult: [],
            searchText: event.target.value
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
            <div className="row search-patients-component" onKeyDown={this.onKeyHandler.bind(this)}>
                <div className="form-group col-xs-6">
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Ingresa nombre, appellido o dni"
                        name="patient"
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
                        name="search-patient-button"
                        onClick={this.search.bind(this)}
                        >
                        Buscar
                        { this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : null}
                    </button>
                </div>
            </div>
        )
    }
}
