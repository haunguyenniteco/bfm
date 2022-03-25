// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import localforage from 'localforage'

Cypress.Commands.add('populateBasket', () => {
  cy.fixture('mockBasket.json').then(async mockBasket => {
    try {
      await localforage.setItem('guest-basket', JSON.stringify(mockBasket))
    } catch (error) {
      console.warn('The basket was not persisted\n', error)
    }
  })
})

Cypress.Commands.add('authSignin', () => {
  cy.intercept('/api/auth/session', { fixture: 'mockSession.json' }).as('session')
  cy.setCookie('next-auth.session-token', 'a valid cookie from your browser session')
  Cypress.Cookies.preserveOnce('next-auth.session-token')
})
