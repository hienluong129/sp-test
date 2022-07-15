// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
/// <reference types="cypress-xpath" />
///<reference types="cypress-iframe" />

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-iframe';
import * as pageObject from '../fixtures/homepage/home-page-object.json';
import * as loginPageObject from '../fixtures/userdetail/login-page-object.json';
import * as data from '../fixtures/testData.json';
// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.Commands.add('login', () => {
    cy.get(loginPageObject.name).type(data.testData.userName)
    cy.get(loginPageObject.pass).type(data.testData.pass)
    cy.get(loginPageObject.loginBtn).click();

})
Cypress.Commands.add('handleDownloadAppPopup', () => {
    cy.get("body").wait(2000).then($body => {
        if ($body.find(pageObject.closeDownloadAppPopup).length > 0) {
                    cy.get(pageObject.closeDownloadAppPopup).click();
                    cy.get(pageObject.closeDownloadAppPopup).should('not.visible')
                }
            })
})