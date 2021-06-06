const code404 = {statusCode: 404}

Cypress.Commands.add('api_projects', () => {
    cy.intercept('GET', 'http://localhost:8000/api/projects/', {fixture: 'projects.json'}).as('apiProjects')
})

Cypress.Commands.add('api_users_me', () => {
    cy.intercept('GET', 'http://localhost:8000/api/users/me/', {fixture: 'user.json'}).as('apiMe')
})

Cypress.Commands.add('api_auth_login', ()=>{
    cy.intercept('POST', 'http://localhost:8000/api/auth/login/', {fixture: 'token.json'}).as('apiAuthLogin')
})

Cypress.Commands.add('api_projects_id', (id)=>{
    cy.fixture('projects').then((json) => {
        let proj = json.find(el => el.id === id)
        return proj
     }).then((proj) => {
        cy.intercept('GET', `http://localhost:8000/api/projects/${id}/`, proj ).as('apiProjectId')
     })
})

Cypress.Commands.add('api_404', () => {
    cy.intercept('GET', 'http://localhost:8000/api/projects/8/', code404 ).as('api404')
    .intercept('DELETE', 'http://localhost:8000/api/projects/1/', code404 ).as('api404')
})

Cypress.Commands.add('login', (url) => {
    cy.api_users_me()
    .api_projects()
    // trigger login API call by placing token and timestamp in memory
    .visit(url, {
        onBeforeLoad(win){
            win.localStorage.setItem('user_token', "Token usertoken")
            win.localStorage.setItem('token_time', Date.now())
        },
    })
   
})

