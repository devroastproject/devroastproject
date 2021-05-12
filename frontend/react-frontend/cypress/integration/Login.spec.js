// Add with POST localhost:8000/api/auth/registration/ 
// retrieve token with POST localhost:8000/api/auth/login/
// DELETE localhost:8000/api/users/<pk>/
// before(
//     function clearDB() {
//         cy.fixture('users')
//         .then((users) => {
//             users.map((user) => {
//                 cy.request({'method': 'DELETE', 'url': `http://localhost:8000/api/users/${user.pk}/`, "Authorization": `Token: ${user.token}`})
//             })
//         })
//     }
// )
// it('Registers new users', ()=> {
//     cy.fixture('users')
//     .then((users) => {
//         users.map((user) => {
//             cy.visit('http://localhost:3000/login')
//             .get('button').contains('Register').click()

//             cy.get('input[name="User Name"]').type(user.username)
//             cy.get('input[name="Email"]').type(user.email)
//             cy.get('input[name="Password"]').type(user.password)
//             cy.get('input[name="Confirm Password"]').type(user.password)

//             cy.get('input[value="Register"]').click()

//             cy.get('h3[class="success message"]').should('be.visible')
//         })
//     })

    

//     cy.get('label').contains('Confirm Password').should('be.visible')
// })