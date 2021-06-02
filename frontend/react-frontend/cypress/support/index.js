Cypress.Commands.add('seed_db', () => {
    cy.intercept('GET', 'http://localhost:8000/api/projects/', {fixture: 'projects.json'})
    cy.visit('/')
})

Cypress.Commands.add('login', () => {
    // trigger login API call by placing token and timestamp in memory
    cy.visit('/', {
        onBeforeLoad(win){
            win.localStorage.setItem('user_token', "Token usertoken")
            win.localStorage.setItem('token_time', Date.now())
        },
    })
    cy.seed_db()
    // intercept API call with dummy user data
    cy.intercept('GET', 'http://localhost:8000/api/users/me/', {fixture: 'user.json'})
})

