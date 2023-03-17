describe('Auth tests', () => {
  before(async () => {
    // Index page
    cy.intercept('http://localhost:4000/api/v1/products', { fixture: 'products.json' });

    // Login
    // cy.intercept('http://localhost:4000/api/v1/products', {fixture: ''})
  });

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
