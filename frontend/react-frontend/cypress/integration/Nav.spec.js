// // test navbar display
const routes = ['/addproject', '/profile', '/login']

describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        routes.map(route => {
            cy.visit(route)
            .get('div[id="LoginForm"]').should('be.visible')
        })
    })

    it('only shows options for Home and Login', () => {
        cy.get('a:contains("DEVROAST")').should('be.visible').should('have.attr', 'href', '/')
        .get('a[id="LogOutButton"]').should('be.visible')
        .get('a:contains("ADD NEW PROJECT")').should('not.exist')
        .get('div[id="AvatarMenu"]').should('not.exist')
    })

    it('small screen menu does not appear', () => {
        cy.viewport(800, 1300)
        .get('svg[data-testid="MenuIcon"]').should('not.exist')
    })
})

describe('Nav logged in', () => {
    
    beforeEach(() => {
        cy.login('/')
    })

    it('shows links for all routes', () => {
        cy.get('div[id="AvatarMenu"]').should('be.visible').click()
        .get('p:contains("Logout")').should('exist').parent().should('be.visible').should('have.attr', 'href', '/')
        .get('p:contains("Profile")').should('exist').parent().should('be.visible').should('have.attr', 'href', '/profile')
        .get('a:contains("Add New Project")').should('be.visible').should('have.attr', 'href', '/addproject')
        .get('a[href="/"]').should('exist')
        .get('svg[data-testid="MenuIcon"]').should('not.be.visible')
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
        // .get('div[id="AvatarMenu"]').click()
        .should(() => {
            expect(localStorage.getItem('devroast_user_token')).to.be.not.null
            expect(localStorage.getItem('devroast_token_time')).to.be.not.null
        })
        .get('p:contains("Logout")').should('exist').click({force: true})
        .should(() => {
            expect(localStorage.getItem('devroast_user_token')).to.be.null
            expect(localStorage.getItem('devroast_token_time')).to.be.null
        })
        .get('a[id="LogOutButton"]').should('be.visible')
    })

    it('collapses options into menu when screen is small', () => {
        cy.viewport(800, 1300).wait(500)
        .get('svg[data-testid="MenuIcon"]').should('be.visible').click()
        .get('a:contains("Add New Project")').should('be.visible').should('have.attr', 'href', '/addproject')
        .get('a:contains("ADD NEW PROJECT")').should('not.exist')
    })
})
