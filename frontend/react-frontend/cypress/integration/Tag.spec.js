describe('Tag Tests Logged In', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
        cy.intercept('PUT', 'http://localhost:8000/api/tags/1/', {status: 200}).as('apiPutTag1')
        cy.intercept('PUT', 'http://localhost:8000/api/tags/2/', {status: 200}).as('apiPutTag2xyz')

    })

    it('the tag form displays all tags currently assigned', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .get('span:contains("Tag1")').should('be.visible')
            }
        )  
    })

    it('a tag can be added to a comment', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .type('Tag2xyz').wait(500).get('span:contains("Tag2xyz")').should('be.visible').click()
                .get('svg[data-testid="CancelOutlinedIcon"]').click()
                .get('span:contains("Tag2xyz")').should('be.visible')
            }
        )  
    })

    it('a tag can be removed from a comment', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .get('span:contains("Tag1")').should('be.visible').click()
                .get('svg[data-testid="CancelOutlinedIcon"]').click()
                .get('span:contains("Tag1")').should('not.exist')
            }
        )  
    })

    it('a tag can be added to a project', () => {
        cy.get('h3:contains("User\'s Project")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible').type('Tag2xyz').wait(500)
                .get('span:contains("Tag2xyz")').should('be.visible').click()
                .get('svg[data-testid="CancelOutlinedIcon"]').click()
                .get('span:contains("Tag2xyz")').should('be.visible')
            }
        )  
    })

    it('a tag can be removed from a project', () => {
        cy.get('h3:contains("User\'s Project")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .get('span:contains("Tag1")').should('be.visible').click()
                .get('svg[data-testid="CancelOutlinedIcon"]').click()
                .get('span:contains("Tag1")').should('not.exist')
            }
        )  
    })

    it('a tag can be searched for within the form', () => {
        cy.get('h3:contains("User\'s Project")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .type('xyz').get('span:contains("Tag2xyz")').should('be.visible')
            }
        )  
    }) 

    it('the tag form displays all tags being searched for', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .type('T')
                .get('span:contains("Tag2xyz")').should('be.visible')
                .get('span:contains("Tag3")').should('be.visible')
                .get('span:contains("Tag1")').should('be.visible')
            }
        )  
    })

    it('tags UI changes when assigned/unassigned', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('be.visible').click().wait(500)
                .get('input[name="tagSearch"]').should('be.visible')
                .type('T').wait(500)
                .get('span:contains("Tag2xyz")').should('be.visible')
                .parent()
                .should('have.class', 'MuiChip-outlined').click()
                .should('have.class', 'MuiChip-filled')
            }
        )  
    })

    it('tags can only be assigned when logged in and comment is owned', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('exist')
            }
        )
        cy.get('p:contains("this is from user1")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="LocalOfferOutlinedIcon"]').should('not.exist')
            }
        )
    })

})

describe('Tag Tests Logged Out', () => {

    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('tags appear in a list when logged out', () => {
        cy.get('p:contains("this is from user1")').parent().parent().within(
            () => {
                cy.get('.TagList').should('be.visible')
                .within(() => { cy.get('span:contains("Tag3")').should('be.visible')})
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