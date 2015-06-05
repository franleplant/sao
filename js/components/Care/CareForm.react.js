import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Audit from '../dumb/Audit.react.js';
import SearchPatients from '../dumb/SearchPatients.react.js';
import CarePracticesForm from '../dumb/CarePracticesFrom.react.js';
import Odontogram from '../dumb/Odontogram.react.js';

import careStore from '../../stores/careStore.js';
import patientStore from '../../stores/patientStore.js';
//import careActions from '../../actions/careActions.js';


// TODO: (app wide)
// - Add the data points for creating and deleting
// - (we are almost there)
export default class CareForm extends React.Component {
    constructor(props) {
        super(props);

        // Pre bind
        this._onChange = this._onChange.bind(this);
        this._onPatientChange = this._onPatientChange.bind(this);

        this.state = careStore.getState();
        this.state.patient = patientStore.getState();
    }

    componentDidMount() {
        //careStore.onChange(this._onChange);
        patientStore.onChange(this._onPatientChange);

        //// Only if we are editting
        //var careId = this.props.careId;
        //if (!careId) return;
        //careActions.get(careId)
        //this.setState({
            //loading: true
        //})
    }

    componentWillUnmount() {
        //careStore.removeChangeListener(this._onChange);
        patientStore.removeChangeListener(this._onPatientChange);
    }

    _onPatientChange() {
        var newPatient = patientStore.getState();

        this.setState({
            patient: newPatient
        })
    }

    _onChange() {
        //var newState = careStore.getState();

        //if (newState.meta.justRemoved) {
            //this.props.onDeleteCallback();
            //return;
        //}

        //newState.loading = false;

        //this.setState(newState);

        //if (newState.meta.justCreated) {
            //this.props.successCallback(newState.careId);
        //}
    }


    deleteCare() {
        //if (!confirm('Esta seguro que desea borrar el turno? Esta accion es irreversible.')) {
            //return;
        //}

        //careActions.remove(this.props.careId)

        //this.setState({
            //loading: true
        //})
    }

    onCarePracticesChange(newCarePractices) {
        this.setState({
            carePractices: newCarePractices
        });
    }




    onOdontogramChange(teethState) {
        this.state.patient.odontogramTeethState = teethState;
        this.setState({
            patient: this.state.patient
        })
    }

    submit(event) {
        event.preventDefault();

        //var care = {
            //selectedTime: this.state.selectedTime,
            //selectedDate: this.state.selectedDate,
            //selectedPatientId: this.state.selectedPatientId
        //};

        //if (!this.props.careId)  {
            ////care Creation
            //careActions.create(care);
        //} else {
            ////care Edition
            //careActions.update(this.props.careId, care);
        //}

        //this.setState({
            //loading: true
        //})

    }

    render() {

        return (
            <div>
                { this.state.loading ? <i className="fa fa-spinner"></i> : null }
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.submit.bind(this)}>

                            <fieldset className="row">
                                <div className="form-group col-xs-6">
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        required
                                        valueLink={this.linkState('selectedDate')}
                                        />
                                </div>
                            </fieldset>

                            <div className="form-group">
                                <label>Paciente</label>
                                <SearchPatients/>
                            </div>


                            <div className="panel panel-default">
                                <div className="panel-heading">Odontograma</div>
                                <div className="panel-body">

                                    <Odontogram
                                        teethState={this.state.patient.odontogramTeethState}
                                        onChange={this.onOdontogramChange.bind(this)}
                                        />

                                </div>
                            </div>


                            <div className="panel panel-default">
                              <div className="panel-heading">Practicas</div>
                                <div className="panel-body">

                                    <CarePracticesForm
                                        value={this.state.carePractices}
                                        onChange={this.onCarePracticesChange.bind(this)}
                                        />

                                </div>
                            </div>

                            <div className="panel panel-default">
                              <div className="panel-heading">Multimedia</div>
                                <div className="panel-body">
                                    <input type="file"/>
                                </div>
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

                {/*
                <Audit
                    show={this.props.careId}
                    edited={this.state.auditEdited || 'nunca'}
                    created={this.state.auditCreated}
                    onDelete={this.deletecare.bind(this)}
                    />
                    */}
            </div>
        );
    }
}


ReactMixin(CareForm.prototype, React.addons.LinkedStateMixin);
