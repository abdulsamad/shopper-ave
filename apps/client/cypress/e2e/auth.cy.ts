describe('Auth tests', () => {
  it('User logs In', async () => {
    // Visit login page
    cy.visit('/login');

    // Enter email
    cy.get('[name="email"]').type('john@example.com');

    // Enter password
    cy.get('[name="password"]').type(`john@123{enter}`);

    // Check user is navigated to homepage
    cy.url().should('include', '/');

    // Check navbar has username of logged in user
    cy.get('button').contains('John Doe').should('be.visible');
  });
});

export {};
