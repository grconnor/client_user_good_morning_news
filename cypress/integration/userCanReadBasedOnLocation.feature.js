const stubLocation = require("../support/stubLocation");

describe("user can read articles based on their location", () => {
  context('when in Sweden', () => {
    before(() => {
      cy.server()  
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles",
        response: "fixture:articles_index.json",
      }); 
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/?local=Sweden",
        response: "fixture:sweden_index.json",
      });
      cy.visit("/", stubLocation({
        latitude: 60, 
        longitude: 18,
      }));
      cy.get("[data-cy='location']").should("contain", "Sweden").click()
    })

    it("Visitors can see articles for the location: Sweden", () => {
      cy.get("[data-cy='article-1']").within(() => {
        cy.get("[data-cy='title']").should("contain", "This happened in Sweden");
      });
      cy.get("[data-cy='article-2']").within(() => {
        cy.get("[data-cy='title']").should("contain", "This also happened in Sweden");
      });
    });
  })

  context('when in Argentina', () => {
    before(() => {
      cy.server()
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles",
        response: "fixture:articles_index.json",
      });      
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles/?local=Argentina",
        response: "fixture:international_index.json",
      });
      cy.visit("/", stubLocation({
        latitude: -31, 
        longitude: -61,
      }));
      cy.get("[data-cy='location']").should("contain", "Argentina").click()
    })

    it("Visitors can see articles for the location: international", () => {
      cy.get("[data-cy='article-1']").within(() => {
        cy.get("[data-cy='title']").should("contain", "Argentina and the Blue Dollar");
      });
      cy.get("[data-cy='article-2']").within(() => {
        cy.get("[data-cy='title']").should("contain", "Colombia Colombia Colombia!");
      });
    });
  })
})