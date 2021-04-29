/// <reference types = "Cypress"/>

describe("Test suite", ()=>{

    beforeEach(()=>{
        cy.viewport(1024, 768 )
        cy.fixture("example").then((data)=>{
            globalThis.data = data
        })
    })

    it("should have SEO text", ()=>{
        cy.visit("/produkte")
        cy.get("[data-test='seo'] strong").contains("Finden Sie Ihren Pflegeliebling unter den NIVEA Produkten")

    })

    it("should have search svg", ()=>{
     
        cy.visit("/")
        cy.get("[data-action-id='search'] svg").should("be.visible").click()
        cy.get("[name='q']").click()
        cy.get(".nx-layer__close-btn div").click()
    })

    it("should login", ()=>{
     
        cy.visit("/")
        cy.get("[data-action-id='account']").click()
        cy.get("li[data-test*='loggen'] a").click({force:true})
        cy.url().should("include", "Account/Login")
        cy.login(data.email, data.password)
        cy.url().should("not.include", "Account/Login")
        cy.get("a[data-action-id='account']").click()
        cy.get("[data-test='logout'] a").click()
    })

})