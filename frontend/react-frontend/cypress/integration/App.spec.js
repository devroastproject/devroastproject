// test timeout and refresh logins
describe('Persistent Login', () => {

    beforeEach(() => {
        cy.login('/').wait(['@apiMe'])
    })

    it('stays logged in on refresh', () => {
        cy.get('div[id="AvatarMenu"]').should('be.visible')
        cy.reload()
        .get('div[id="AvatarMenu"]').should('be.visible')
    })

    it('automatically logs out after 30 minutes', () => {
        cy.get('div[id="AvatarMenu"]').should('be.visible')
        .then(() => localStorage.setItem('devroast_token_time', Date.now() - 1800000))
        .reload()//.wait(1000)
        cy.get('a[id="LogOutButton"]').should('exist')
    })

})

describe('CSS Tests', () => {
    
    beforeEach(() => {
        cy.api_projects()
        cy.visit('/').wait(['@apiProjects'])
    })

    it('keeps the Navbar at the top of the page', () => {
        cy.get('header[id="NavBar"]')
        .should('have.class', 'MuiAppBar-root')
    })

})

describe('Message tests', () => {

    beforeEach(() => {
        cy.login('/profile')
    })

    it('displays a success message for five seconds', () => {
        cy.intercept('PUT', 'http://localhost:8000/api/users/me/change_password/', {"statusCode": 200}).as('ChangePWordReply')
        .get('input[name="Old Password"]').type('oldpword')
        .get('input[name="New Password"]').type('newpword')
        .get('input[name="Confirm New Password"]').type('newpword')
        .get('button[type="submit"]').click().wait(['@ChangePWordReply'])
        .get('div[id="success message"]').should('be.visible')
        .wait(5050)
        .get('div[id="success message"]').should('not.exist')
    })

    it('displays a failure message for five seconds', () => {
        cy.intercept('PUT', 'http://localhost:8000/api/users/me/change_password/', {"statusCode": 400}).as('ChangePWordReply')
        .get('input[name="Old Password"]').type('oldpword')
        .get('input[name="New Password"]').type('newpword')
        .get('input[name="Confirm New Password"]').type('newpword')
        .get('button[type="submit"]').click().wait(['@ChangePWordReply'])
        .get('div[id="error message"]').should('be.visible')
        .wait(5050)
        .get('div[id="error message"]').should('not.exist')
    })
})