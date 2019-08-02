describe('Test URL Shortener',()=>{
    before(() =>{
        cy.visit('http://localhost:3000')
        cy.url().should('include','localhost:3000')
    })

    it('should search for value via title', ()=>{
       cy.get('#root > div > div.Home_positioning__OAtY0 > form > p').contains('Trim URL Below') 
    })

    it('should submit without a value and get an error message in the title field', ()=>{
        cy.get('#root > div > div.Home_positioning__OAtY0 > form > div:nth-child(3) > button').click()
        cy.get('#root > div > div.Home_positioning__OAtY0 > form > p').contains('Oops...') 
    })

    it('should input a URL and get a hyperlink in return for the same URL', ()=>{
        cy.get('[data-cy=input]').as('input')

        cy.get('@input').type('https://www.cnn.com')
        cy.get('#root > div > div.Home_positioning__OAtY0 > form > div:nth-child(3) > button').click()
        cy.get('#root > div > div.update_Modal__LVI5Q.update_ModalOpen__10h02').should('be.visible')
        cy.get('#root > div > div.update_Modal__LVI5Q.update_ModalOpen__10h02 > div > p:nth-child(2) > a').should('have.attr','href').and('include', 'https://www.cnn.com')
    })
        
})

