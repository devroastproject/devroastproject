// test navbar display
const routes = ['/addproject', '/profile', '/login']

describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        routes.map(route => {
            cy.visit(route)
            .get('div[id="LoginForm"]').should('be.visible')
        })
    })

    it('only shows options for Home and Login', () => {
        cy.get('a[href="/"]').should('be.visible')
        .get('a[id="LogOutButton"]').should('be.visible')
        .get('a[href="/addproject"]').should('not.exist')
        .get('div[id="AvatarMenu"]').should('not.exist')
    })

    it('small screen menu does not appear', () => {
        cy.contains("Sorry, something went wrong").should('exist')
    })
})

describe('Nav logged in', () => {
    
    beforeEach(() => {
        cy.login('/')
    })

    it('shows links for all routes', () => {
        cy.get('div[id="AvatarMenu"]').should('be.visible').click()
        .get('p:contains("Logout")').should('exist')
        .get('p:contains("Profile")').should('exist')
        .get('a[href="/addproject"]').should('exist')
        .get('a[href="/"]').should('exist')
    })

    it('can visit new project form', () => {
        cy.visit('/addproject')
        .get('div[id=ProjectForm]').should('be.visible')
        .get('div[id="AvatarMenu"]').should('be.visible')
    })

    it('can visit profile page', () => {
        cy.visit('/profile')
        .get('div[id=Profile]').should('be.visible')
        .get('div[id="AvatarMenu"]').should('be.visible')
    })

    it('logs out', () => {
        cy.visit('/')
        .get('div[id="AvatarMenu"]').click()
        .get('p:contains("Logout")').should('exist').click()
        .should(() => {
            expect(localStorage.getItem('user_token')).to.be.null
            expect(localStorage.getItem('token_time')).to.be.null
        })
        .get('a[id="LogOutButton"]').should('be.visible')
    })

    it('collapses options into menu when screen is small', () => {
        cy.contains("Sorry, something went wrong").should('exist')
    })
})
