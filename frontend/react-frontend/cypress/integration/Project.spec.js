// projects should render as ProjectPreview in ProjectList on home page
it.only('loads projects', () => {
    cy.seed_db()   
})
// clicking ProjectPreview link should lead to correct ProjectPage
// all project feilds should display
// Edit and Delete Buttons should be shown only to owner
// Delete button should cause browser prompt
// Edit button should replace ProjectDetail with ProjectForm with correct data in field
// ProjectForm should have Cancel button that returns to ProjectDetail