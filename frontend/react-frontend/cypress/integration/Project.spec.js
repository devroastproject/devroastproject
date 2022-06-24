describe('ProjectList tests', () => {

    beforeEach(() => {
        cy.api_projects()
        .visit('/').wait(['@apiProjects'])
    })

    it('shows both test project previews', () => {
        cy.fixture('projects').then((json) => {json.map((proj) => {
            cy.get(`a[href="project/${proj.id}"]`).should('exist')
            .get(`h5:contains(${proj.title})`).should('be.visible')
            .get(`p:contains(${proj.description})`).should('be.visible')
        })})
    })

    it('links to project pages from preview cards', () => {
        cy.fixture('projects').then((json) => {json.map((proj) => {
            cy.api_projects_id(proj.id)
            .get(`a[href="project/${proj.id}"]`).click()
            .url().should('eq', `${Cypress.config('baseUrl')}/project/${proj.id}`)
            .get(`h3:contains(${proj.title})`)
            .go('back')
        })})
    })
    
    it('redirects from project pages that do not exist', () => {
        cy.api_404()
        .visit('/project/8').wait(['@api404'])
        .get('div[id="ProjectList"]').should('be.visible')
        .url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it('displays the correct number of comments', () => {
        cy.get('div[id="1_comment_count"]').should('exist')
        .get('div[id="2_comment_count"]').should('exist')
    })
    
})


describe('ProjectPage tests', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('displays all project fields', () => {
        cy.get(`h3:contains("User's Project")`).should('be.visible')
        .get('p:contains("user")').should('be.visible')
        .get('a[href="www.usersrepo.com"]').should('exist')
        .get('a[href="www.usersproj.com"]').should('exist')
        .get(`p:contains("This is User's Project description.")`).should('be.visible')
    })

    it('only shows Edit and Delete to the owner', () => {
        cy.api_projects_id(2).wait(['@apiProjectId'])
        .get('p:contains("This is User\'s Project description.")').should('exist')
        .get('div[id="projButtons"]').within(
            () => {cy.get('svg[data-testid="EditOutlinedIcon"]').should('be.visible')})
        .visit('/project/2/').wait(['@apiProjectId'])
        .get('p:contains("This is User 2\'s Project description.")').should('exist')
        .get('div[id="projButtons"]').should('not.exist')
        .visit('/project/1/')
    })

    it('does not delete project without confirmation', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('div[id="projButtons"]').within(
            () => {
            cy.get('svg[data-testid="EditOutlinedIcon"]').click()
            .get('button[id="DeleteButton"]').should('be.visible').click()
        })
        .get('div[id="DeleteConfirm"]').should('exist')
    })

    it('forwards to home on delete', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.api_404()
        .get('div[id="projButtons"]').within(
            () => {
            cy.get('svg[data-testid="EditOutlinedIcon"]').click()
            .get('button[id="DeleteButton"]').should('be.visible').click()
        })
        .get('div[id="DeleteConfirm"]').should('exist')
        .get('button:contains("Delete Forever")').click().wait(['@api404'])
        .url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it('prepopulates the Edit form with the correct data', () => { 
        cy.fixture('projects', {timeout: 500}).then((json) => {
            cy.get('div[id="projButtons"]')
            .find('svg[data-testid="EditOutlinedIcon"]').click()
            .get('input[name="Title"]').should('exist')
            .should('have.value', json[0].title)
            .get('input[name="Repo URL"]').should('have.value', json[0].repo_url)
            .get('input[name="Hosted URL"]').should('have.value', json[0].hosted_url)
            .get('textarea').should('have.value', json[0].description)
        })
    })
       
    it('returns to the project page on edit', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.intercept('PUT', 'http://localhost:8000/api/projects/1/', {"statusCode": 200})
        .get('div[id="projButtons"]')
        .find('svg[data-testid="EditOutlinedIcon"]').click()
        .get('input[name="Title"]').type('Edited Title')
        .get('button[id="ProjectSubmitButton"]').click()
        .get('div[class="ProjectPage"]').should('exist')
        .get('div[class="ProjectForm"]').should('not.exist')
    })

})

describe('ProjectForm tests', () => {

    beforeEach(() => {
        cy.login('/addproject').wait(['@apiMe'])
    })

    it('requires a title and description for a new project', {retries: {runMode: 2, openMode: 1}}, () => {
        cy.get('button[id="ProjectSubmitButton"]').should('be.disabled')
        .get('input[name="Title"]').type('Test Title')
        .get('button[id="ProjectSubmitButton"]').should('be.disabled')
        .get('textarea[name="Description"]').type('Description')
        .get('button[id="ProjectSubmitButton"]').should('not.be.disabled')
    })

})