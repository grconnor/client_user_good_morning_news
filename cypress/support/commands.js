Cypress.Commands.add("login", (role) => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/auth/sign_in",
    response: `fixture:successful_login_${role}.json`,
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/auth/**",
    response: `fixture:successful_login_${role}.json`,
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/articles",
    response: "fixture:articles_index.json",
  });

  cy.visit("/");
  cy.get('[data-cy="login-button"]').contains("Login").click();

  cy.get('[data-cy="login-form"]').within(() => {
    cy.get('[data-cy="email"]').type("registered@mail.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="submit"]').contains("Submit").click();
  });
});

Cypress.Commands.add("typeInCardInformation", (id, field, value) => {
  cy.get(`[data-cy=${id}]`).within(() => {
    cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body)
        .find(`input[name=${field}]`)
        .type(`${value}`, { delay: 10 });
    });
  });
});

Cypress.Commands.add("signUp", () => {
  cy.server();
  cy.route({
    method: "POST",
    url:
      "http://localhost:3000/api/v1/aut**",
    response: {
      status:
        "success. Your registration was successful! Please log in to confirm your registration",
    },
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/articles",
    response: "fixture:articles_index.json",
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/auth/**",
  });
  cy.visit("/");
  cy.get('[data-cy="sign-up-button"]').contains("Sign Up").click();

  cy.get('[data-cy="sign-up-form"]').within(() => {
    cy.get('[data-cy="name"]').type("Facundo Osores");
    cy.get('[data-cy="email"]').type("registered@mail.com");
    cy.get('[data-cy="password"]').type("password");
    cy.get('[data-cy="password-confirmation"]').type("password");
    cy.get('[data-cy="submit"]').contains("Submit").click();
  });    
});
