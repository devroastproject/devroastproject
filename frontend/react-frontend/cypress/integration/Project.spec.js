describe('ProjectList tests', () => {

    beforeEach(() => {
        cy.api_projects()
        .visit('/').wait(['@apiProjects'])
    })

    it('shows both test project previews', () => {
        cy.fixture('projects').then((json) => {json.map((proj) => {
            cy.get(`a[href="project/${proj.id}"]`).should('exist')
            .get(`h3:contains(${proj.title})`).should('be.visible')
            .get(`p:contains(${proj.description})`).should('be.visible')
        })})
    })

    it('links to project pages from preview cards', () => {
        cy.fixture('projects').then((json) => {json.map((proj) => {
            cy.api_projects_id(proj.id)
            .get(`a[href="project/${proj.id}"]`).click()
            .url().should('eq', `${Cypress.config('baseUrl')}/project/${proj.id}`)
            .get(`h1:contains(${proj.title})`)
            .go('back')
        })})
    })
    
    it('redirects from project pages that do not exist', () => {
        cy.api_404()
        .visit('/project/8').wait(['@api404'])
        .get('div[class=prevPanel]').should('be.visible')
        .url().should('eq', `${Cypress.config('baseUrl')}/`)
    })
})


describe('ProjectPage tests', () => {

    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/')
    })

    it('displays all project fields', () => {
        cy.get(`h1:contains("User's Project")`).should('be.visible')
        .get('p:contains("by 1")').should('be.visible')
        .get('a[href="www.usersrepo.com"]').should('exist')
        .get('a[href="www.usersproj.com"]').should('exist')
        .get(`p:contains("This is User's Project description.")`).should('be.visible')
    })

    it('only shows Edit and Delete to the owner', () => {
        cy.api_projects_id(2)
        .get('button:contains("Edit")').should('be.visible')
        .get('button:contains("Delete")').should('be.visible')
        .visit('/project/2/')
        .get('button:contains("Edit")').should('not.exist')
        .get('button:contains("Delete")').should('not.exist')
    })

    it('does not delete project without confirmation', () => {
        cy.on('window:confirm', () => false)
        .get('button:contains("Delete")').click()
        .url().should('eq', `${Cypress.config('baseUrl')}/project/1/`)
    })

    it('forwards to home on delete', () => {
        cy.api_404()
        .get('button:contains("Delete")').click()
        .get('div[class=prevPanel]').should('be.visible')
        .url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it('prepopulates the Edit form with the correct data', () => {
        cy.fixture('projects').then((json) => {
        cy.get('button:contains("Edit")').click()
        .get('input[name="Title"]').should('have.value', json[0].title)
        .get('input[name="Repo URL"]').should('have.value', json[0].repo_url)
        .get('input[name="Hosted URL"]').should('have.value', json[0].hosted_url)
        .get('textarea').should('have.value', json[0].description)
        })
    })

    it('returns to the project page on edit', () => {
        cy.intercept('PUT', 'http://localhost:8000/api/projects/1/', {"statusCode": 200})
        .get('button:contains("Edit")').click()
        .get('input[name="Title"]').type('Edited Title')
        .get('input[type="Submit"]').click()
        .get('div[class="ProjectPage"]').should('exist')
        .get('div[class="ProjectForm"]').should('not.exist')
    })

    it('requires a title and description for a new project', () => {
        cy.get('li[id="addNewProject"]').click()
        .get('input[type="Submit"]').should('be.disabled')
        .get('input[name="Title"]').type('Title')
        .get('input[type="Submit"]').should('be.disabled')
        .get('textarea').type('Description')
        .get('input[type="Submit"]').should('not.be.disabled')
    })
})