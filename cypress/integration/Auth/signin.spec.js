// todo uncomment where problem with authorisation will be solved
// describe('IDP signin', () => {
//   before(() => {
//     cy.visit('/')
//     cy.location('pathname').should('eq', '/get-address')
//     cy.get('[data-cy=auth-title]').should('be.visible').contains('Address Validation')
//     cy.get('[data-cy=header-title]').should('contain', 'Stores and available services for your address')
//     cy.get('[data-cy=search-input]').should('be.visible')
//     cy.get('[data-cy=auth-close]').should('be.visible').click()
//   })

//   it('should not be signed in', () => {
//     cy.visit('/')
//     cy.visit('/auth/return')
//     cy.visit('/')
//     cy.get("[data-cy='not-authenticated']")
//       .should('exist')
//       .then(() => {
//         cy.log('IDP NOT SIGNED IN')
//       })
//   })

//   it('should be signed in', () => {
//     cy.authSignin()
//     cy.visit('/')
//     cy.wait('@session')
//     cy.visit('/auth/return')
//     cy.get("[data-cy='authenticated']")
//       .should('exist')
//       .then(() => {
//         cy.log('IDP SIGNED IN')
//       })
//     cy.get('[data-cy=auth-close]').should('be.visible').click()
//   })
// })
