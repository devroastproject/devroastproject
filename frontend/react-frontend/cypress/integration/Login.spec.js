const data = {'username': 'user', 'email': 'user@example.com', 'pword': 'userspword', 'wrong': 'wrongpword'}

describe('login and registration form validation', () => {
    beforeEach(() => {
        cy.visit('/login')
    })
    
    it('disables Log In button when form is blank', () => {
        cy.get('button[id="LoginButton"]').should('be.disabled')

    })

    it('disables Register button when form is blank', () => {
        cy.get('button[id="LoginRegisterSwitch"]').click()
        .get('button[id="LoginButton"]').should('be.disabled')

    })

    it('enables Log In button when all fields are filled out', () => {
        cy.get('input[name="User Name"]').type(data.username)
        .get('input[name="Email"]').type(data.email)
        .get('input[name="Password"]').type(data.pword)
        .get('button[id="LoginButton"]').should('not.be.disabled')
    })

    it('enables Register button when all fields are filled out', () => {
        cy.get('button[id="LoginRegisterSwitch"]').click()
        .get('input[name="User Name"]').type(data.username)
        .get('input[name="Email"]').type(data.email)
        .get('input[name="Password"]').type(data.pword)
        .get('input[name="Confirm Password"]').type(data.pword)
        .get('button[id="LoginButton"]').should('not.be.disabled')
    })

    it('validates passwords before allowing registration', () => {
        cy.get('button[id="LoginRegisterSwitch"]').click()
        .get('input[name="User Name"]').type(data.username)
        .get('input[name="Email"]').type(data.email)
        .get('input[name="Password"]').type(data.pword)
        .get('input[name="Confirm Password"]').type(data.wrong)
        .get('button[id="LoginButton"]').should('be.disabled')
    })
})

describe('Form behavior', () => {
    it('Forwards to home on log in', () => {
        cy.api_projects()   // intercept projects for home page
        cy.api_auth_login() // intercept token return
        cy.api_users_me()   // intercept user data fetch
        cy.visit('/')
         .get('a[id="LogOutButton"]')
         .click()
        cy.get('input[name="User Name"]').type(data.username)
         .get('input[name="Email"]').type(data.email)
         .get('input[name="Password"]').type(data.pword)
         .get('button[id="LoginButton"]').click()
        cy.wait(['@apiAuthLogin', '@apiMe'])
         .get('div[id="ProjectList"]').should('exist')
         .url().should('eq', `${Cypress.config('baseUrl')}/`)
         .get('div[id="AvatarMenu"]').should('be.visible')
    })
})