describe('Nav not logged in', () => {
    it('redirects all routes to login without credentials', () => {
        const routes = ['/addproject', '/profile', '/login']
        routes.map(route => {
            cy.visit(route)
            cy.get('div[class="LoginForm"]').should('be.visible')
        })
    })
})

const projs = [{title: 'title', description: 'description', user: 'user', repo_url: 'repo_url', hosted_url: 'hosted_url', id: 'id'}]
describe('Nav logged in', () => {
    it.only('loads projects', () => {
        cy.server()
        cy.route('GET', 'projects/', projs)
        cy.visit('/')

        
    })
    // let user

    // before( function fetchUser() {
    //     // cy.fixture('users.json').then((json) => user = json[1])
    //     cy.intercept('POST', 'http://localhost:8000/api/auth/login/', {fixture: 'users.json'}) //.then((json) => user = json[0])
    // })

    // // beforeEach( function setUser(){
    // //     cy.visit('/', {
    // //         onBeforeLoad(win){
    // //             win.localStorage.setItem('user_token', user.token)
    // //             win.localStorage.setItem('token_time', Date.now())
    // //         },
    // //     })
    // // })
    

    // it('can visit new project form', () => {
    //     cy.visit('/addproject')
    //     .get('div[class=ProjectForm]').should('be.visible')
    //     .get('li[id=logOut]').should('be.visible')
    // })

    // it('can visit profile page', () => {
    //     cy.visit('/profile')
    //     .get('div[class=Profile]').should('be.visible')
    //     .get('li[id=logOut]').should('be.visible')
    // })

    // it('logs out', () => {
    //     cy.visit('/')
    //     .get('li[id=logOut]').click()
    //     .should(() => {
    //         expect(localStorage.getItem('user_token')).to.be.null
    //         expect(localStorage.getItem('token_time')).to.be.null
    //     })
    //     .get('li[id=logIn]').should('be.visible')
    // })
})