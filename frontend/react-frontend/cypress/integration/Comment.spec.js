describe('Comment CRUD logged in', () => {
    
    beforeEach(() => {
        cy.api_projects_id(1)
        .login('/project/1/').wait(['@apiProjectId', '@apiMe'])
    })

    it('posts a new prompt', () => {
        throw new Error('stub')
    })
    
    it('edits an existing comment', () => {
        throw new Error('stub')
    })

    it('deletes a comment', () => {
        throw new Error('stub')
    })

    it('closes a thread', () => {
        throw new Error('stub')
    })

    it('each user can only up or downvote a comment once', () => {
        throw new Error('stub')
    })

})

describe('Comment CRUD not logged in', () => {
    
    beforeEach(() => {
        
    })

    it('only allows new comments when logged in', () => {
        throw new Error('stub')
    })
    
    it('only the author can edit a comment', () => {
        throw new Error('stub')
    })

    it('only the prompt author can delete a comment', () => {
        throw new Error('stub')
    })

    it('only the prompt author can close a thread', () => {
        throw new Error('stub')
    })

})

describe('Reply Tests', () => {
    
    beforeEach(() => {
        
    })

    it('posts a new reply', () => {
        throw new Error('stub')
    })

    it('new replies cannot be added when the prompt is closed', () => {
        throw new Error('stub')
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
