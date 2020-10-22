describe("Visitor can register an account", () => {
  context("Succesfully", () => {
    it("user can click on register button and see registration form", () => {
      cy.signUp();
      cy.get('[data-cy="registration-message"]').contains(
        "Your registration was successful! Please log in to confirm your registration"
      );
    });
  });

  context("Unsuccessfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/v1/articles",
        response: "fixture:articles_index.json",
      });
      cy.visit("/");
    });
    it("Unsuccessfully with wrong password", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/aut**",
        response: {
          errors: ["Passwords do not mactch. Please try again."],
        },
        status: "422",
      });
      cy.get('[data-cy="sign-up-button"]').contains("Sign Up").click();

      cy.get('[data-cy="sign-up-form"]').within(() => {
        cy.get('[data-cy="name"]').type("Facundo Osores");
        cy.get('[data-cy="email"]').type("registered@mail.com");
        cy.get('[data-cy="password"]').type("password");
        cy.get('[data-cy="password-confirmation"]').type("wrongPassword");
        cy.get('[data-cy="submit"]').contains("Submit").click();
      });
    });
    
    it("Unsuccessfully - email already exist", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/v1/aut**",
        response: {
          errors: ["The mail already exists. Please choose another"],
        },
        status: "422",
      });
      cy.get('[data-cy="sign-up-button"]').contains("Sign Up").click();

      cy.get('[data-cy="sign-up-form"]').within(() => {
        cy.get('[data-cy="name"]').type("Facundo Osores");
        cy.get('[data-cy="email"]').type("registered@mail.com");
        cy.get('[data-cy="password"]').type("password");
        cy.get('[data-cy="password-confirmation"]').type("password");
        cy.get('[data-cy="submit"]').contains("Submit").click();
      });
    });
  });
});
