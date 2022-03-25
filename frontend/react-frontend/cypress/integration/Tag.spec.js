describe('Tag Tests Logged In', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
        cy.intercept('PUT', 'http://localhost:8000/api/tags/1/', {status: 200}).as('apiPutTag1')
        cy.intercept('PUT', 'http://localhost:8000/api/tags/2/', {status: 200}).as('apiPutTag2xyz')

    })

    it('the tag form displays all tags currently assigned', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .get('p:contains("Tag1")').should('be.visible')
            }
        )  
    })

    it('a tag can be added to a comment', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .type('Tag2xyz').get('p:contains("Tag2xyz")').should('be.visible').click()
                .get('button:contains("Done")').click()
                .get('p:contains("Tag2xyz")').should('be.visible')
            }
        )  
    })

    it('a tag can be removed from a comment', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .get('p:contains("Tag1")').should('be.visible').click()
                .get('button:contains("Done")').click()
                .get('p:contains("Tag1")').should('not.exist')
            }
        )  
    })

    it('a tag can be added to a project', () => {
        cy.get('h1:contains("User\'s Project")').parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .type('Tag2xyz').get('p:contains("Tag2xyz")').should('be.visible').click()
                .get('button:contains("Done")').click()
                .get('p:contains("Tag2xyz")').should('be.visible')
            }
        )  
    })

    it('a tag can be removed from a project', () => {
        cy.get('h1:contains("User\'s Project")').parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .get('p:contains("Tag1")').should('be.visible').click()
                .get('button:contains("Done")').click()
                .get('p:contains("Tag1")').should('not.exist')
            }
        )  
    })

    it('a tag can be searched for within the form', () => {
        cy.get('h1:contains("User\'s Project")').parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .type('xyz').get('p:contains("Tag2xyz")').should('be.visible')
            }
        )  
    }) 

    it('the tag form displays all tags being searched for', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .type('T')
                .get('p:contains("Tag2xyz")').should('be.visible')
                .get('p:contains("Tag3")').should('be.visible')
                .get('p:contains("Tag1")').should('be.visible')
            }
        )  
    })

    it('tags UI changes when assigned/unassigned', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('be.visible').click()
                .get('input[name="tagSearch"]').should('be.visible')
                .type('T')
                .get('p:contains("Tag2xyz")').should('be.visible')
                .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)').click()
                .parent().parent()
                .should('have.css', 'background-color', 'rgb(0, 128, 0)')
            }
        )  
    })

    it('tags can only be assigned when logged in and comment is owned', () => {
        cy.get('p:contains("Tag1")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('exist')
            }
        )
        cy.get('p:contains("Tag3")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Modify")').should('not.exist')
            }
        )
    })

})

describe('Tag Tests Logged Out', () => {

    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('tags appear in a list when logged out', () => {
        cy.get('p:contains("this is from user1")').parent().parent().parent().within(
            () => {
                cy.get('div[class="TagList"]').should('be.visible')
                .within(() => { cy.get('p:contains("Tag3")').should('be.visible')})
            }
        )  
    })

})


// describe('Tag CRUD', () => {

//     beforeEach(() => {
        
//     })

//     it('users with 3 or more comments can create a new tag', () => {
//         throw new Error('stub')
//     })

//     it('users with 3 or more comments can edit a tag', () => {
//         throw new Error('stub')
//     })

//     it('users with 3 or more comments can delete a tag', () => {
//         throw new Error('stub')
//     })
// })