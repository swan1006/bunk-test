describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Open Modal', () => {
    cy.get('[data-testid="open-modal"]').click();
  });

  it('Input name and amount', () => {
    cy.get('[data-testid="open-modal"]').click();
    cy.get('[data-testid="user-name"]').type('test');
    cy.get('[data-testid="amount"]').type('10');
  })

  it('Insert User', () => {
    cy.get('[data-testid="open-modal"]').click();
    cy.get('[data-testid="user-name"]').type('test');
    cy.get('[data-testid="amount"]').type('10');
    cy.get('[data-testid="insert-user"]').click();
  });

  it('Settle up', () => {
    cy.get('[data-testid="settle-up"]').click();
  })

})