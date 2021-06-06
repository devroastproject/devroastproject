// test navbar display
const routes = ['/addproject', '/profile', '/login']

describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        routes.map(route => {
            cy.visit(route)
            .get('div[class="LoginForm"]').should('be.visible')
        })
    })

    it('only shows options for Home and Login', () => {
        cy.get('a[href="/"]').should('be.visible')
        .get('a[href="/login"]').should('be.visible')
        .get('a[href="/addproject"]').should('not.exist')
        .get('a[href="/profile"]').should('not.exist')
    })
})

describe('Nav logged in', () => {
    
    beforeEach(() => {
        cy.login('/')
    })

    it('shows links for all routes', () => {
        cy.get('a[href="/"]').should('be.visible')
        routes.map(route => {
            cy.visit(route)
            .get(`a[href="${route}"]`).should('be.visible')
        })
    })

    it('can visit new project form', () => {
        cy.visit('/addproject')
        .get('div[class=ProjectForm]').should('be.visible')
        .get('li[id=logOut]').should('be.visible')
    })

    it('can visit profile page', () => {
        cy.visit('/profile')
        .get('div[class=Profile]').should('be.visible')
        .get('li[id=logOut]').should('be.visible')
    })

    it('logs out', () => {
        cy.visit('/')
        .get('li[id=logOut]').click()
        .should(() => {
            expect(localStorage.getItem('user_token')).to.be.null
            expect(localStorage.getItem('token_time')).to.be.null
        })
        .get('li[id=logIn]').should('be.visible')
    })

    it('shows all user options', () => {
        cy.get('a[href="/"]').should('be.visible')
        .get('a[href="/login"]').should('not.exist')
        .get('a[href="/addproject"]').should('be.visible')
        .get('a[href="/profile"]').should('be.visible')
        .get('li[id=logOut]').should('be.visible')
    })
})