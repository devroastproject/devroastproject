const pwords = {'old': 'oldpword', 'new': 'newpword', 'wrong': 'badpword'}

describe('password update form validation', () => {
    
    beforeEach(() => {
        cy.login('/profile')
    })

    it('disables submit button when form is blank', () => {
        cy.get('button:contains("UPDATE PASSWORD")').should('be.disabled')
    })

    it('disables submit button when current password is omitted', () => {
        cy.get('input[name="New Password"]').type(pwords.new)
        .get('input[name="Confirm New Password"]').type(pwords.wrong)
        .get('button:contains("UPDATE PASSWORD")').should('be.disabled')
    })

    it('disables submit button when passwords do not match', () => {
        cy.get('input[name="Old Password"]').type(pwords.old)
        .get('input[name="New Password"]').type(pwords.new)
        .get('input[name="Confirm New Password"]').type(pwords.wrong)
        .get('button:contains("UPDATE PASSWORD")').should('be.disabled')
    })

    it('enables submit button when passwords match', () => {
        cy.get('input[name="Old Password"]').type(pwords.old)
        .get('input[name="New Password"]').type(pwords.new)
        .get('input[name="Confirm New Password"]').type(pwords.new)
        .get('button:contains("UPDATE PASSWORD")').should('not.be.disabled')
    })
})