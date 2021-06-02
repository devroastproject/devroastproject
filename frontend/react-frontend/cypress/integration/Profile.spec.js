const pwords = {'old': 'oldpword', 'new': 'newpword', 'wrong': 'badpword'}

describe('password update form validation', () => {
    
    beforeEach(() => {
        cy.login()
        cy.visit('/profile')
    })

    it('disables submit button when form is blank', () => {
        cy.get('input[value="Update Password"]').should('be.disabled')
    })

    it('disables submit button when current password is omitted', () => {
        cy.get('input[name="New Password"]').type(pwords.new)
        cy.get('input[name="Confirm Password"]').type(pwords.wrong)
        cy.get('input[value="Update Password"]').should('be.disabled')
    })

    it('disables submit button when passwords do not match', () => {
        cy.get('input[name="Old Password"]').type(pwords.old)
        cy.get('input[name="New Password"]').type(pwords.new)
        cy.get('input[name="Confirm Password"]').type(pwords.wrong)
        cy.get('input[value="Update Password"]').should('be.disabled')
    })

    it('enables submit button when passwords match', () => {
        cy.get('input[name="Old Password"]').type(pwords.old)
        cy.get('input[name="New Password"]').type(pwords.new)
        cy.get('input[name="Confirm Password"]').type(pwords.new)
        cy.get('input[value="Update Password"]').should('not.be.disabled')
    })
})