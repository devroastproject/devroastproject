describe('Voting logged in', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('cannot vote on closed comment', () => {
        cy.get('p:contains("this comment is closed")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('be.disabled')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('be.disabled')
            }
        )
    })

    it('when voted, vote is bold', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('have.class', 'MuiButton-contained')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('have.class', 'MuiButton-text')
            }
        )
    })

    it('when voted, other is disabled', () => {
        cy.get('p:contains("this is a reply to user2")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('not.be.disabled')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('be.disabled')
            }
        )
    })

    it('buttons show correct number of positive and negative votes', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('contain', '1')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('contain', '1')
            }
        )
    })

    it('voting increments correct number', () => {
        cy.intercept('POST', 'http://localhost:8000/api/votes/', 
        {
            "body": {
                "comment": 2, 
                "id": 1, 
                "positive": true, 
                "user": 1, 
                "username":"user",
                "code": 201
            },
            "statusCode": 201
        }
        ).as('apiPostVote')
        cy.get('p:contains("this yours")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]')
                .parent().parent().should('contain', '0')
                .click().wait(['@apiPostVote']).wait(500)
                .get('svg[data-testid="ThumbUpIcon"]')
                .parent().parent().should('contain', '1')
            }
        )
    })

    it('clicking button again decrements vote', () => {
        cy.intercept('DELETE', 'http://localhost:8000/api/votes/5/', {"statusCode": 204}).as('apiDeleteVote')
        cy.get('p:contains("this is a reply to user2")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]')
                .parent().parent().should('contain', '1')
                .click().wait(['@apiDeleteVote']).wait(500)
                .get('svg[data-testid="ThumbUpIcon"]')
                .parent().parent().should('contain', '0')
            }
        )
    })
})

describe('Voting logged out', () => {

    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('cannot vote when logged out', () => {
        cy.get('p:contains("this is from user1")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('be.disabled')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('be.disabled')
            }
        )
    })

    it('can view votes when logged out', () => {
        cy.get('p:contains("this is mine")').parent().parent().within(
            () => {
                cy.get('svg[data-testid="ThumbUpIcon"]').should('be.visible')
                .parent().parent().should('contain', '1')
                .get('svg[data-testid="ThumbDownIcon"]').should('be.visible')
                .parent().parent().should('contain', '1')
            }
        )
    })
})