describe('Comment CRUD logged in', () => {
    
    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('posts a new prompt', () => {
        cy.intercept('POST', 'http://localhost:8000/api/comments/', {status: 200}).as('apiPostComment')
        cy.get('button:contains("New Comment")').should('be.visible').click()
        .get('button:contains("Cancel")').should('be.visible')
        .get('input[type="Submit"]').should('be.disabled')
        .get('textarea').type('test comment')
        .get('input[type="Submit"]').should('be.enabled').click()
        .wait(['@apiPostComment']).then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)
        })
    })
    
    it('edits an existing comment',{retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Edit")').should('be.visible').click()
                .get('textarea').invoke('val').then( val => expect(val).to.equal('this is mine'))
            }
        )
    })

    it('deletes a comment', () => {
        cy.get('p:contains("this is mine")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Delete")').click()
                .get('p:contains("Are You Sure")').should('exist')
            }
        )
    })

    it('only the author can edit a comment', () => {
        cy.get('p:contains("this is from user1")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Edit")').should('not.exist')
            }
        )
    })

    it('only the prompt author can delete a comment', () => {
        cy.get('p:contains("this is from user1")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Delete")').should('not.exist')
            }
        )
    })

    it('posts a new reply', () => {
        cy.intercept('POST', 'http://localhost:8000/api/comments/', {status: 200}).as('apiPostReply')
        cy.get('p:contains("this is from user1")').parent().parent().parent().within(
            () => {
                cy.get('button:contains("Reply")').click()
                .get('textarea').type('test reply')
                .get('input[type="Submit"]').click()
                .wait(['@apiPostReply']).then((intercept) => {
                    expect(intercept.response.statusCode).to.equal(200)
                })
            }
        )
    })

    it('new replies cannot be added when the prompt is closed', () => {
        throw new Error('stub')
    })

    // it('each user can only up or downvote a comment once', () => {
    //     throw new Error('stub')
    // })

})

describe('Comment CRUD not logged in', () => {
    
    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('only allows new comments when logged in', () => {
        cy.get('button:contains("New Comment")').should('not.exist')
    })

    it('only allows new replies when logged in', () => {
        cy.get('button:contains("Reply")').should('not.exist')
    })

})

// describe('Tag Tests', () => {
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

//     it('a tag can be added to a comment', () => {
//         throw new Error('stub')
//     })

//     it('a tag can be removed from a comment', () => {
//         throw new Error('stub')
//     })

//     it('a tag added to a reply is added to the prompt', () => {
//         throw new Error('stub')
//     })
// })
