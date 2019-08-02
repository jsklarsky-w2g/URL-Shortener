describe('Test URL Shortener',()=>{
    before(() =>{
        cy.visit('http://localhost:3000')
        cy.url().should('include','localhost:3000')
    })

    it('should search for value via title', ()=>{
       cy.get('#root > div > div.Home_positioning__OAtY0 > form > p').contains('Trim URL Below') 
    })

    it('should submit without a value and get an error message in the title field', ()=>{
        // cy.get('[data-cy=input]').as('input')

        // cy.get('@input').type('')
        cy.get('#root > div > div.Home_positioning__OAtY0 > form > div:nth-child(3) > button').click()
        cy.get('#root > div > div.Home_positioning__OAtY0 > form > p').contains('Oops...') 
    })
})

