describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        const routes = ['/addproject', '/profile', '/login']
        routes.map(route => {
            cy.visit('http://localhost:3000'+route)
            cy.get('div[class="LoginForm"]').should('be.visible')
        })
    })
})

describe('Nav logged in', () => {
    let user

    before( function fetchUser() {
        cy.request('POST', 'http://localhost:8000/api/auth/login/', {
            'username': 'user',
            'email': 'user@example.com',
            'password': 'userspword'
        }).its('body').then((res) => {
            user = res
        })
    })

    beforeEach( function setUser(){
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win){
                win.localStorage.setItem('user_token', `Token ${user.key}`)
                win.localStorage.setItem('token_time', Date.now())
            },
        })
    })

    it('can visit new project form', () => {
        cy.visit('http://localhost:3000/addproject')
        .get('div[class=ProjectForm]').should('be.visible')
        .get('li[id=logOut]').should('be.visible')
    })

    it('can visit profile page', () => {
        cy.visit('http://localhost:3000/profile')
        .get('div[class=Profile]').should('be.visible')
        .get('li[id=logOut]').should('be.visible')
    })

    it('logs out', () => {
        cy.visit('http://localhost:3000/')
        .get('li[id=logOut]').click()
        .should(() => {
            expect(localStorage.getItem('user_token')).to.be.null
            expect(localStorage.getItem('token_time')).to.be.null
        })
        .get('li[id=logIn]').should('be.visible')
    })
})