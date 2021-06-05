const data = {'username': 'user', 'email': 'user@example.com', 'pword': 'userspword', 'wrong': 'wrongpword'}

describe('login and registration form validation', () => {
    beforeEach(() => {
        cy.visit('/login')
    })
    
    it('disables Log In button when form is blank', () => {
        cy.get('input[value="Log In"]').should('be.disabled')

    })

    it('disables Register button when form is blank', () => {
        cy.get('button:contains("Register a New Account")').click()
        cy.get('input[value="Register"]').should('be.disabled')

    })

    it('enables Log In button when all fields are filled out', () => {
        cy.get('input[name="User Name"]').type(data.username)
        cy.get('input[name="Email"]').type(data.email)
        cy.get('input[name="Password"]').type(data.pword)
        cy.get('input[value="Log In"]').should('not.be.disabled')
    })

    it('enables Register button when all fields are filled out', () => {
        cy.get('button:contains("Register a New Account")').click()
        cy.get('input[name="User Name"]').type(data.username)
        cy.get('input[name="Email"]').type(data.email)
        cy.get('input[name="Password"]').type(data.pword)
        cy.get('input[name="Confirm Password"]').type(data.pword)
        cy.get('input[value="Register"]').should('not.be.disabled')
    })

    it('validates passwords before allowing registration', () => {
        cy.get('button:contains("Register a New Account")').click()
        cy.get('input[name="User Name"]').type(data.username)
        cy.get('input[name="Email"]').type(data.email)
        cy.get('input[name="Password"]').type(data.pword)
        cy.get('input[name="Confirm Password"]').type(data.wrong)
        cy.get('input[value="Register"]').should('be.disabled')
    })
})

describe('Form behavior', () => {
    it('Forwards to home on log in', () => {
        cy.api_projects()   // intercept projects for home page
        cy.api_auth_login() // intercept token return
        cy.api_users_me()   // intercept user data fetch
        cy.visit('/')
         .get('li[id="logIn"]')
         .click()
        cy.get('input[name="User Name"]').type(data.username)
         .get('input[name="Email"]').type(data.email)
         .get('input[name="Password"]').type(data.pword)
         .get('input[value="Log In"]').click()
        cy.wait(['@apiAuthLogin', '@apiMe'])
         .get('div[class="prevPanel"]').should('exist')
         .url().should('eq', 'http://localhost:3000/')
         .get('li[id="userProfile"]').should('contain', `${data.username} is Logged In`)
    })
})