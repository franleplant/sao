import React from 'react';
import Router, {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import AuthenticatedApp from './components/AuthenticatedApp.react.js';

import NotFound from './components/NotFound.react.js';

import App from './components/App.react';
import Login from './components/Login.react';
import Signup from './components/Signup.react';
import Home from './components/Home.react';
// Patient Module
import Patients from './components/Patients/Patients.react';
import PatientEdit from './components/Patients/EditPatient.react';
import PatientNew from './components/Patients/NewPatient.react';
// Appointment Module
import AppointmentNew from './components/Appointments/NewAppointment.react.js';
import AppointmentEdit from './components/Appointments/EditAppointment.react.js';

// Care Module
import NewCare from './components/Care/NewCare.react.js';
import EditCare from './components/Care/EditCare.react.js';




var routes = (
  <Route handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="registrarse" handler={Signup}/>
    <NotFoundRoute handler={NotFound}/>

    <Route handler={AuthenticatedApp} path="/" >
        <DefaultRoute name="home" handler={Home}/>

        {/* Patient Module  */}
        <Route name="pacientes" handler={Patients}/>
        <Route name="editarPaciente" path="pacientes/editar/:patientId" handler={PatientEdit}/>
        <Route name="crearPaciente" path="pacientes/nuevo" handler={PatientNew}/>

        {/* Appointment Module  */}
        <Route name="crearTurno" path="turnos/nuevo/:time?" handler={AppointmentNew}/>
        <Route name="editarTurno" path="turnos/editar/:appointmentId" handler={AppointmentEdit}/>

        {/* Care Module  */}
        <Route name="crearConsulta" path="consultas/nueva" handler={NewCare}/>
        <Route name="editarConsulta" path="consultas/editar/:careId" handler={EditCare}/>
    </Route>
  </Route>
);

export default Router.create({routes});



