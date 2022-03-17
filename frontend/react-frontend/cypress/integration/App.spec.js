// test timeout and refresh logins
describe('Persistent Login', () => {

    beforeEach(() => {
        cy.login('/').wait(['@apiMe'])
    })

    it('stays logged in on refresh', () => {
        cy.get('li[id=logOut]').should('be.visible')
        .get('a[href="/login"]').should('not.exist')
        cy.reload()
        .get('li[id=logOut]').should('be.visible')
        .get('a[href="/login"]').should('not.exist')
    })

    it('automatically logs out after 30 minutes', () => {
        cy.get('li[id=logOut]').should('be.visible')
        .get('a[href="/login"]').should('not.exist')
        .then(() => localStorage.setItem('token_time', Date.now() - 1800000))
        .reload()//.wait(1000)
        cy.get('li[id=logOut]').should('not.exist')
        .get('a[href="/login"]').should('exist')
    })

})

describe('CSS Tests', () => {
    
    beforeEach(() => {
        cy.api_projects()
        cy.visit('/').wait(['@apiProjects'])
    })

    it('keeps the Navbar at the top of the page', () => {
        cy.get('nav')
        .should('have.css', 'display', 'flex')
        .should('have.css', 'position', 'fixed')
    })

})

describe('Message tests', () => {

    beforeEach(() => {
        cy.login('/profile')
    })

    it('displays a success message for five seconds', () => {
        cy.intercept('PUT', 'http://localhost:8000/api/users/me/change_password/', {"statusCode": 200})
        .get('input[name="Old Password"]').type('oldpword')
        .get('input[name="New Password"]').type('newpword')
        .get('input[name="Confirm Password"]').type('newpword')
        .get('input[value="Update Password"]').click()
        .get('h3[class="success message"]').should('be.visible')
        .wait(5050)
        .get('h3[class="success message"]').should('not.exist')
    })

    it('displays a failure message for five seconds', () => {
        cy.intercept('PUT', 'http://localhost:8000/api/users/me/change_password/', {"statusCode": 400})
        .get('input[name="Old Password"]').type('oldpword')
        .get('input[name="New Password"]').type('newpword')
        .get('input[name="Confirm Password"]').type('newpword')
        .get('input[value="Update Password"]').click()
        .get('h3[class="failure message"]').should('be.visible')
        .wait(5050)
        .get('h3[class="success message"]').should('not.exist')
    })
})