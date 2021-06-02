describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        const routes = ['/addproject', '/profile', '/login']
        routes.map(route => {
            cy.visit(route)
            cy.get('div[class="LoginForm"]').should('be.visible')
        })
    })
})

describe('Nav logged in', () => {
    
    beforeEach(() => {
        cy.login()
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
})