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
import PatientEdit from './components/Patients/Edit.react';
import PatientNew from './components/Patients/New.react';
// Appointment Module
import AppointmentNew from './components/Appointments/NewAppointment.react.js';
import AppointmentEdit from './components/Appointments/EditAppointment.react.js';




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
        <Route name="crearTurno" path="turnos/nuevo" handler={AppointmentNew}/>
        <Route name="editarTurno" path="turnos/editar/:appointmentId" handler={AppointmentEdit}/>
    </Route>
  </Route>
);

export default Router.create({routes});



