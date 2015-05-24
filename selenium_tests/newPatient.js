var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser = wd.promiseChainRemote();

// optional extra logging
browser.on('status', function(info) {
  console.log(info);
});
browser.on('command', function(eventType, command, response) {
  console.log(' > ' + eventType, command, (response || ''));
});
browser.on('http', function(meth, path, data) {
  console.log(' > ' + meth, path, (data || ''));
});


var username = "a@a.com";
var password = "test";
var prefix = 'selenium'
var randomString = Math.random().toString(36).substring(7);
var randomNumber = Math.floor(Math.random()*1000000000);
var today = (new Date()).toUTCString();

browser
    .init({browserName:'chrome'})
    .setAsyncScriptTimeout(300000)
    .get("http://localhost:3000/#/login")
    .waitForElementByCss('form [name=username]', 20000)
    .elementByCss('form [name=username]')
        .type(username)
    .elementByCss('form [name=password]')
        .type(password)
    .elementByCss('form')
        .submit()
    // On home, click for patients
    .waitForElementByCss('#bs-example-navbar-collapse-1 > ul:nth-child(1) > li:nth-child(4) > a', 20000)
        .click()

    // Click on new patient button
    .elementByCss('#react > div > div > div > h1 > button')
        .click()
    //.get("http://localhost:3000/?#/pacientes/nuevo")
    .elementByCss('h1')
        .text().should.become('Nuevo Paciente')
    .elementByCss('form [name=patientName]')
        .type(prefix + randomString)
    .elementByCss('form [name=patientEmail]')
        .type(randomString + '@' + prefix + 'test')
    .elementByCss('form [name=patientDNI]')
        .type(randomNumber)
    .elementByCss('form [name=patientDOB]')
        .type('01071990')
    .elementByCss('form [name=patientTel]')
        .type(randomNumber)
    // Province, select buenos aires
    .elementByCss('form > .addressForm > div:nth-child(2) > div:nth-child(1) > select > option:nth-child(3)')
        .click()
    // Locality, select the first one
    .elementByCss('form > .addressForm > div:nth-child(2) > div:nth-child(2) > select > option:nth-child(2)')
        .click()
    .elementByCss('form [name=patientAddress]')
        .type('Test Av. 12345')
    // os form, select the first os
    .elementByCss('form > .osForm > div:nth-child(2) > select > option:nth-child(2)')
        .click()
    .elementByCss('form [name=patientOSaffiliateNumber]')
        .type('test 123')
    .elementByCss('form [name=patientOSplan]')
        .type('test 123')
    .elementByCss('form')
        .submit()

    .sleep(2000)
    .alertText()
        .should.become('El Paciente ha sido creado exitosamente!')
        .acceptAlert()
    //.sleep(100000)
    // Let the edit page load
    .waitForConditionInBrowser("document.querySelector('h1').innerText === 'Editar Paciente'", 20000)
    // Wait for the patient to load
    .waitForConditionInBrowser("document.querySelector('form [name=patientName]').value.indexOf('selenium') !== -1", 20000)

  .fin(function() { return browser.quit(); })
  .done();
