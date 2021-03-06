import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Audit from '../dumb/Audit.react.js';
import SearchPatients from '../dumb/SearchPatients.react.js';
import CarePracticesForm from '../dumb/CarePracticesFrom.react.js';
import Odontogram from '../dumb/Odontogram.react.js';

import careStore from '../../stores/careStore.js';
import patientStore from '../../stores/patientStore.js';
import careActions from '../../actions/careActions.js';


export default class CareForm extends React.Component {
    constructor(props) {
        super(props);

        // Pre bind
        this._onChange = this._onChange.bind(this);
        this._onPatientChange = this._onPatientChange.bind(this);

        this.state = careStore.getState();
        this.state.care.selectedPatient = patientStore.getState();
    }

    componentDidMount() {
        careStore.onChange(this._onChange);
        patientStore.onChange(this._onPatientChange);

        // Only if we are editting
        var careId = this.props.careId;
        if (!careId) return;
        careActions.get(careId)
        this.setState({
            loading: true
        })
    }

    componentWillUnmount() {
        careStore.removeChangeListener(this._onChange);
        patientStore.removeChangeListener(this._onPatientChange);
    }

    _onPatientChange() {
        this.state.care.selectedPatient = patientStore.getState();

        this.setState({
            care: this.state.care
        })
    }

    _onChange() {
        var newState = careStore.getState();

        if (newState.meta.justRemoved) {
            this.props.onDeleteCallback();
            return;
        }


        // As patient and care come from different stores, we
        // need to attacht it again
        newState.care.selectedPatient = patientStore.getState();

        newState.loading = false;

        this.setState(newState);

        if (newState.meta.justCreated) {
            this.props.successCallback(newState.careId);
        }
    }


    deleteCare() {
        if (!confirm('Esta seguro que desea borrar la consulta? Esta accion es irreversible.')) {
            return;
        }

        careActions.remove(this.props.careId)

        this.setState({
            loading: true
        })
    }

    onCarePracticesChange(newCarePractices) {
        this.state.care.carePractices = newCarePractices;
        this.setState({
            care: this.state.care
        });
    }

    onSelectedDateChange(event) {
        this.state.care.selectedDate = event.target.value;
        this.setState({
            care: this.state.care
        })
    }


    onOdontogramChange(teethState) {
        this.state.care.selectedPatient.odontogramData = teethState;
        this.setState({
            care: this.state.care
        })
    }

    onNotesChange(event) {
        this.state.care.notes = event.target.value;
        this.setState({
            care: this.state.care
        })
    }

    onFileChange(event) {
        var self = this;
        var files = event.target.files;

        for (var i = 0, len = files.length; i < len; i++) {
            var reader = new FileReader();

            reader.onloadend = function () {
                self.state.care.files = self.state.care.files || [];
                self.state.care.files.push(reader.result);
                self.setState({
                    care: self.state.care
                });
            }

            reader.readAsDataURL(files[i]);
        }

    }

    removeFile(index, event) {
        this.state.care.files.splice(index, 1);
        this.setState({
            care: this.state.care
        })
    }

    submit(event) {
        event.preventDefault();

        // Need to save the care and save the patient :)
        var care = {
            selectedDate: this.state.care.selectedDate,
            selectedPatientId: this.state.care.selectedPatient.patientId,
            carePractices: this.state.care.carePractices,
            files: this.state.care.files || [],
            notes: this.state.care.notes
        }

        var odontogramData = this.state.care.selectedPatient.odontogramData;

        if (!this.props.careId)  {
            //care Creation
            careActions.create(care, odontogramData);
        } else {
            //care Edition
            careActions.update(this.props.careId, care, odontogramData);
        }

        this.setState({
            loading: true
        })

    }

    render() {

        return (
            <div>
                { this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : null }
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.submit.bind(this)}>

                            <fieldset className="row">
                                <div className="form-group col-xs-6">
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        required
                                        value={this.state.care.selectedDate}
                                        onChange={this.onSelectedDateChange.bind(this)}
                                        />
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <label>Paciente</label>
                                <SearchPatients/>
                            </div>

                            <div className="panel panel-default">
                              <div className="panel-heading">Multimedia</div>
                                <div className="panel-body">

                                    <input type="file" multiple ref="fileUploader" onChange={this.onFileChange.bind(this)}/>


                                    <div className="row">
                                        {
                                            this.state.care.files && this.state.care.files.map((fileUrl, index) => {
                                                return (
                                                    <div className="col-sm-12" key={`thumbnails ${index}`}>
                                                        <div className="thumbnail">
                                                            <img src={fileUrl}/>
                                                            <div className="caption">
                                                                <p>
                                                                    <a
                                                                        className="btn btn-danger"
                                                                        role="button"
                                                                        onClick={this.removeFile.bind(this, index)}
                                                                        >
                                                                        Borrar
                                                                    </a>
                                                                    <a
                                                                        href={fileUrl}
                                                                        className="btn btn-primary"
                                                                        role="button"
                                                                        target="_blank"
                                                                        >
                                                                        Ver
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="panel panel-default">
                                <div className="panel-heading">Odontograma</div>
                                <div className="panel-body">

                                    <Odontogram
                                        teethState={this.state.care.selectedPatient.odontogramData}
                                        onChange={this.onOdontogramChange.bind(this)}
                                        />

                                </div>
                            </div>


                            <div className="panel panel-default">
                              <div className="panel-heading">Practicas</div>
                                <div className="panel-body">

                                    <CarePracticesForm
                                        value={this.state.care.carePractices}
                                        onChange={this.onCarePracticesChange.bind(this)}
                                        />

                                </div>
                            </div>




                            <div className="form-group">
                                <label>Notas</label>
                                <textarea
                                    className="form-control"
                                    value={this.state.care.notes}
                                    onChange={this.onNotesChange.bind(this)}
                                    name="notes"
                                    rows="3"
                                    >
                                </textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={this.state.loading}
                                >
                                Aceptar
                            </button>
                        </form>
                    </div>
                </div>

                <Audit
                    show={this.props.careId}
                    edited={this.state.care.auditEdited || 'nunca'}
                    created={this.state.care.auditCreated}
                    onDelete={this.deleteCare.bind(this)}
                    />
            </div>
        );
    }
}


ReactMixin(CareForm.prototype, React.addons.LinkedStateMixin);
