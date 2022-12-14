describe('Testing', () => {
    it('Navigate to the application', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Create a new file', () => {
        cy.get('#new').click()
        cy.get('#validate').click()
        cy.get('#application\\.label').type('Application')
        cy.get('[href="/references"]').click()
        cy.get('#addReference').click()
        cy.get('#reference\\.name').type('Référence')
        cy.get('#addColumns').click()
        cy.get('#reference\\.column\\.name').type('Colonne 1')
        cy.get('#addColumn').click()
        cy.get('#reference\\.column\\.name').type('Colonne 2')
        cy.get('#addColumn').click()
        cy.get('#reference\\.column\\.name').type('Colonne 3')
        cy.get('#addColumn').click()
        cy.get('#primaryKey').first().click()
        /*cy.get('#addConstraints').click()
        cy.get('#reference\\.constraint\\.name').type('Contrainte')
        cy.get('#constraintType').click({force: true})
        cy.contains('Reference').click()
        cy.get('#selectedColumn').click({force: true})
        cy.contains('colonne_1').click({force: true})
        cy.get('#addConstraint').click()*/
        cy.get('#addReference').click()
        cy.get('#close').click()
        cy.wait(500)
    })

    it('Import a existing file', () => {
        cy.get('#home').click()
        cy.get('#import').invoke('show').selectFile('cypress/fixtures/foret.yaml')
        // cy.get('.v-navigation-drawer__scrim').click('center')
        // cy.get('#applicationName').contains('foret')
    })
})