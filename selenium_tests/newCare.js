// This script will attempt to create a new care on a patient whose name contains 'hernan'
// right now it is not factored into a single variable so be sure that a patient exists :)

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var wd = require('wd');
var moment = require('moment');
var credentials = require('./credentials.js');


console.log(credentials)

chai.use(chaiAsPromised);
chai.should();


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
        .type(credentials.username)
    .elementByCss('form [name=password]')
        .type(credentials.password)
    .elementByCss('form')
        .submit()
    // On home, click on 'atender'
    .waitForElementByCss('#main-navbar > ul:nth-child(1) > li:nth-child(3) > a', 20000)
        .click()

    // Check that the date is set to today
    .elementByCss('form [name=date]')
        .getValue()
        .should.become(moment().format('YYYY-MM-DD'))

    // search and select a patient
    .elementByCss('form [name=patient]')
        .type('hernan')
    .elementByCss('form [name="search-patient-button"]')
        .click()

    // Select the first result (hernan miranda)
    .waitForElementByCss('form .search-patients-component > div.form-group.col-xs-6 > div > a', 2000)
        .click()

    // click the last teeth state, and ensure it is checked (previous editions)
    .elementByCss('form .odontogram .teethState fieldset:nth-child(4) > div:nth-child(5) > label > input[type="checkbox"]')
        .isSelected()
        .then(function(checked) {
            if (checked) return;

            return browser
                .elementByCss('form .odontogram .teethState fieldset:nth-child(4) > div:nth-child(5) > label > input[type="checkbox"]')
                .click()
        })
    .elementByCss('form .odontogram .teethState fieldset:nth-child(4) > div:nth-child(5) > label > input[type="checkbox"]')
        .isSelected()
        .should.become(true)

    // Care practices
    //
    // Fill the default practice
    .elementByCss('form .care-practices > table > tbody > tr > td:nth-child(2) > input')
        .type(randomString)
    // add a new practice
    .elementByCss('form .care-practices > table > tfoot button')
        .click()

    // add a note to that new practice
    .elementByCss('form .care-practices > table > tbody > tr:nth-child(2) > td:nth-child(2) > input')
        .type(randomString)

    // Add some notes
    .elementByCss('form [name=notes]')
        .type(randomString)

    // Submit
    .elementByCss('form')
        .submit()

    // Accept the success alert
    .sleep(2000)
    .acceptAlert()
    ////.sleep(100000)

    // Let the edit page load
    .waitForConditionInBrowser("document.querySelector('h1').innerText === 'Editar Consulta'", 20000)
    // Wait for the patient to load
    .waitForConditionInBrowser("document.querySelector('form [name=patient]').value.indexOf('Hernan') !== -1", 20000)

  .fin(function() { return browser.quit(); })
  .done();
