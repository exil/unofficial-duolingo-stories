
describe('Navigate Course Editor', () => {
    beforeEach(() => {
        cy.fixture('courses.json').as('courses')
        cy.intercept('POST', '**/session', { fixture: 'session.json' }).as("session")
        cy.intercept('POST', '**/courses', { fixture: 'courses.json' }).as("courses")
        cy.intercept('POST', '**/course?id=12', { fixture: 'course12.json' }).as("course_es")
        cy.intercept('POST', '**/course?id=2', { fixture: 'course2.json' }).as("course_du")
        cy.intercept('POST', '**/course?id=9', { fixture: 'course9.json' }).as("course_ru")
        cy.intercept('POST', '**/import?id=12&id2=2', { fixture: 'import_12_2.json' }).as("import_du")
        cy.intercept('POST', '**/story?id=75', { fixture: 'story_75.json' }).as("story75")
        cy.intercept('POST', '**/image?id=*', { fixture: 'image.json' }).as("image")
        cy.intercept('POST', '**/avatar_names?*', { fixture: 'avatar_names.json' }).as("avatar_names")
        cy.intercept('POST', '**/language?id=9', { fixture: 'language_9.json' }).as("language_9")
        cy.intercept('POST', '**/language?id=1', { fixture: 'language_1.json' }).as("language_1")

        cy.visit()
        //cy.get("input[type=text]").type("test")
        //cy.get("input[type=password]").type("test")
        //cy.get("button").type("click")
        //cy.contains("Course-Editor")
    })

    it('Open Spanish (official)', () => {
        // Click on Spanish to see if it is an offical story
        cy.contains("Spanish [en]").parent().click()
        cy.get("#story_list").get("tr").should('have.length.greaterThan', 1)
        cy.get('.AvatarEditorHeader').should('contain', 'official')
        cy.get('.AvatarEditorHeader').should('not.contain', 'Import')
    })

    it('Open Dutch (un official) and try import', () => {
        // Open Dutch
        cy.contains("Dutch [en]").parent().click()
        cy.get("#story_list").get("tr").should('have.length.greaterThan', 1)
        cy.get('.AvatarEditorHeader').should('not.contain', 'official')
        cy.get('#button_import').should('contain', 'Import').click()

        cy.get("#main_overview_container").contains('Importing')
        cy.get("#main_overview_container").get("tr").should("have.length.greaterThan", 1)

        cy.get('#button_back').click()
        cy.get("#main_overview_container").should('not.contain', 'Importing')
    })

    it('Open Russian and start Editor', () => {
        // Open Dutch
        cy.contains("Russian [en]").parent().click()
        cy.get("#story_list").get("tr").should('have.length.greaterThan', 1)
        cy.get('.AvatarEditorHeader').should('not.contain', 'official')

        cy.get("#main_overview_container").get("tr").contains("Room for Rent").click()
        cy.get("#story").get(".title")
        cy.get("#preview").scrollTo('bottom')
        //cy.get('#button_back').click()
    })

})
