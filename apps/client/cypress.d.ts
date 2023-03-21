/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByTestID('greeting')
     */
    getByTestID(value: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Custom command for logging user in
     */
    login(email: string, password: string): void;
  }
}
