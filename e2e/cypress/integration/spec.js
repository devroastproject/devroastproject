it('loads', () => {
    cy.visit('/')
      .should('contain', 'DevRoast')
  })