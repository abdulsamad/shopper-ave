/// <reference types="cypress" />

Cypress.Commands.add('getByTestID', (value) => {
  return cy.get(`[data-cy=${value}]`);
});
