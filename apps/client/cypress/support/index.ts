/// <reference types="cypress" />

Cypress.Commands.add('getByTestID', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (email, password) => {
  // Visit login page
  cy.visit('/login');

  // Enter email
  cy.get('[name="email"]').type(email);

  // Enter password
  cy.get('[name="password"]').type(`${password}{enter}`);

  // Check user is navigated to homepage
  cy.url().should('include', '/');
});

export {};
