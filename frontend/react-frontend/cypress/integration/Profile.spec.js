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

describe('dark mode tests logged in', () => {

    beforeEach(() => {
        cy.login('/profile')
    })

    it('toggles between light and dark modes', () => {
        cy.get('header').should('have.class', 'css-hip9hq-MuiPaper-root-MuiAppBar-root')
        .get('button[id="ModeToggle"]').click()
        .get('header').should('have.class', 'css-1k0i2s9-MuiPaper-root-MuiAppBar-root')
        .get('button[id="ModeToggle"]').click()
        .get('header').should('have.class', 'css-hip9hq-MuiPaper-root-MuiAppBar-root')
    })

    it('mode choice persists on refresh', () => {
        cy.get('header').should('have.class', 'css-hip9hq-MuiPaper-root-MuiAppBar-root')
        .get('button[id="ModeToggle"]').click()
        .get('header').should('have.class', 'css-1k0i2s9-MuiPaper-root-MuiAppBar-root')
        .reload()
        .get('header').should('have.class', 'css-1k0i2s9-MuiPaper-root-MuiAppBar-root')
    })
})

describe('dark mode tests logged out', () => {
    
    it('mode choice persists when logged out', () => {
        cy.visit('/')
        .get('header').should('have.class', 'css-hip9hq-MuiPaper-root-MuiAppBar-root')
        .then(() => localStorage.setItem('devroast_mode', 'dark'))
        .reload()
        .get('header').should('have.class', 'css-1k0i2s9-MuiPaper-root-MuiAppBar-root')
    })
})

// Avatars in all cases lead to the correct profile
    // home page from project preview
    // project detail
    // comment

// when logged out, profile information is shown

// when viewing another's profile, profile information is shown

// when logged in options to change own profile are available

// profile can be edited
// profile form validation

// email can be updated
// email form validation

// username can be changed 

// avatar upload only accepts image files

//BE
//profile returned for correct user
// profile can be created for a user