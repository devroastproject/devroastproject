describe('Voting logged in', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('cannot vote on closed comment', () => {
        cy.get('p:contains("this comment is closed")').parent().within(
            () => {
                cy.get('button:contains("-")').should('not.exist')
                .get('button:contains("+")').should('not.exist')
            }
        )
    })

    it('when voted, vote is bold', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('p:contains("this is mine")').parent().within(
            () => {
                cy.get('button:contains("+")').should('have.css', 'font-weight', '700')
                cy.get('button:contains("-")').should('have.css', 'font-weight', '400')
            }
        )
    })

    it('when voted, other is disabled', () => {
        cy.get('p:contains("this is a reply to user2")').parent().within(
            () => {
                cy.get('button:contains("+")').should('not.be.disabled')
                cy.get('button:contains("-")').should('be.disabled')
            }
        )
    })

    it('buttons show correct number of positive and negative votes', () => {
        cy.get('p:contains("this is mine")').parent().within(
            () => {
                cy.get('button:contains("+1")').should('exist')
                cy.get('button:contains("-1")').should('exist')
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
        cy.get('p:contains("this yours")').parent().within(
            () => {
                cy.get('button:contains("+0")').click().wait(['@apiPostVote'])
                .get('button:contains("+1")').should('exist')
            }
        )
    })

    it('clicking button again decrements vote', () => {
        cy.intercept('DELETE', 'http://localhost:8000/api/votes/5/', {"statusCode": 204}).as('apiDeleteVote')
        cy.get('p:contains("this is a reply to user2")').parent().within(
            () => {
                cy.get('button:contains("+1")').click().wait(['@apiDeleteVote'])
                .get('button:contains("+0")').should('exist')
            }
        )
    })
})

describe('Voting logged out', () => {

    beforeEach(() => {
        cy.api_projects_id(1).visit('/project/1/').wait(['@apiProjectId'])
    })

    it('cannot vote when logged out', () => {
        cy.get('p:contains("this is from user1")').parent().within(
            () => {
                cy.get('button:contains("-")').should('not.exist')
                .get('p:contains("-")').should('exist')
                .get('button:contains("+")').should('not.exist')
                .get('p:contains("+")').should('exist')
            }
        )
    })

    it('can view votes when logged out', () => {
        cy.get('p:contains("+")').should('have.length', 5)
        cy.get('p:contains("-")').should('have.length', 5)
    })
})