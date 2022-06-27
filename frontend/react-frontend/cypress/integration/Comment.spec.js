describe('Comment CRUD logged in', () => {
    
    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('posts a new prompt', () => {
        cy.intercept('POST', 'http://localhost:8000/api/comments/', {status: 200}).as('apiPostComment')
        cy.get('button[id="NewCommentButton"]').should('be.visible').click()
        cy.get('button[id="NewCommentButton"]:contains("Cancel")').should('be.visible')
        .get('button[id="CommentSubmitButton"]').should('be.disabled')
        .get('textarea[name="Comment"]').type('test comment')
        .get('button[id="CommentSubmitButton"]').should('be.enabled').click()
        .wait(['@apiPostComment']).then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200)
        })
    })
    
    it('edits an existing comment',{retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('button[id="EditButton"]').should('be.visible').click()
                cy.get('textarea[name="Comment"]').invoke('val').then( val => expect(val).to.equal('this is mine'))
            }
        )
    })

    it('deletes a comment',{retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('button[id="EditButton"]').should('be.visible').click({force: true})
                .get('button[id="DeleteButton"]').should('be.visible').click({force: true})
                
            }
        ).get('div[id="DeleteConfirm"]').should('exist')
    })

    it('only the author can edit a comment', () => {
        cy.get('p:contains("this is from user1")').parent().parent().within(
            () => {
                cy.get('button[id="EditButton"]').should('not.exist')
            }
        )
    })

    it('posts a new reply', () => {
        cy.intercept('POST', 'http://localhost:8000/api/comments/', {status: 200}).as('apiPostReply')
        cy.get('p:contains("this is from user1")').parent().parent().parent().parent()
        .within(
            () => {
                cy.get('button[id="ReplyButton"]').click({force: true})
                .get('textarea[name="Comment"]').type('test reply')
                .get('button[id="CommentSubmitButton"]').click()
                .wait(['@apiPostReply']).then((intercept) => {
                    expect(intercept.response.statusCode).to.equal(200)
                })
            }
        )
    })

    it('new replies cannot be added when the prompt is closed', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('p:contains("this comment is closed")').parent().parent().parent().within(
            () => {
                cy.get('button[id="ReplyButton"]').should('not.exist')
                .get('button[id="EditButton"]').click({force: true})
                .get('input[id="ClosedCheck"]').should('be.checked')
            }
        )
    })

    it('replies cannot be closed', () => {
        cy.get('p:contains("this is a reply to user2")').parent().parent().within(
            () => {
                cy.get('button[id="EditButton"]').click({force: true})
                .get('input[id="ClosedCheck"]').should('not.exist')
            }
        )
    })

    it('closed threads are marked', () => {
        cy.get('p:contains("CLOSED this comment is closed")').should('exist')
    })
})

describe('Comment CRUD not logged in', () => {
    
    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('only allows new comments when logged in', () => {
        cy.get('button[id="NewCommentButton"]').should('be.disabled')
    })

    it('only allows new replies when logged in', () => {
        cy.get('button[id="ReplyButton"]').should('not.exist')
    })

})
