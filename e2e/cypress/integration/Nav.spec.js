it('redirects all routes to login without credentials', () => {
    const routes = ['/addproject', '/profile', '/login']
    routes.map(route => {
        cy.visit(route)
        cy.get('div[class="LoginForm"]').should('be.visible')
    })
})

it('registers new users', () => {
    cy.visit('/login')
    cy.get('button').contains('Register a New Account').click()

    cy.get('input[name="User Name"]').type('user')
    cy.get('input[name="Email"]').type('user@example.com')
    cy.get('input[name="Password"]').type('userspword')
    cy.get('input[name="Confirm Password"]').type('userspword')
    cy.get('input[type="submit"]').click()
    
    cy.get('nav').should('contain', 'user is Logged In')
  
})