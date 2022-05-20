describe('Testing', () => {
    it('Navigate to the home page', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Create a new file', () => {
        cy.get('.v-card-actions > a.v-btn').click()
        cy.get('.v-navigation-drawer__scrim').click('center')
        cy.get('#input-10').type('test')
        cy.get('.mdi-menu').click()
        cy.get('[href="/references"]').click()
        cy.get('[aria-haspopup="dialog"]').click()
        cy.get(':nth-child(1) > :nth-child(1) > .v-input__control > .v-field > .v-field__field').type('test')
        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__field').type('test1')
        cy.get(':nth-child(2) > .v-btn').click()
        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-field > .v-field__field').type('test2')
        cy.get(':nth-child(2) > .v-btn').click()
    })
})
