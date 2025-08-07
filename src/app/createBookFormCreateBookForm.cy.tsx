import React from "react";
import { CreateBookForm } from "./createBookForm";

describe("<CreateBookForm />", () => {
   it("renders", () => {
      // see: https://on.cypress.io/mounting-react
      cy.mount(<CreateBookForm />);

      cy.get('input[name="title"]').type("The Test Book");
      cy.get('input[name="author"]').type("Cypress Author");
      cy.get('input[name="totalPages"]').type("300");
      cy.get('input[name="isbn"]').type("1234567890");
      cy.get('input[name="description"]').type("Testing with Cypress");
      cy.get('input[name="coverUrl"]').type("https://example.com/cover.jpg");

      cy.contains("Create Book").click();

      cy.get('input[name = "title"]').should("be.empty");
      cy.get('input[name = "author"]').should("be.empty");
      cy.get('input[name = "totalPages"]').should("be.empty");
      cy.get('input[name = "isbn"]').should("be.empty");
      cy.get('input[name = "description"]').should("be.empty");
      cy.get('input[name = "coverUrl"]').should("be.empty");
   });
});
