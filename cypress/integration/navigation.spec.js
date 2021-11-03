describe("Navigation", () => {
  it("should visit root", () => {
    cy.request("http://localhost:8001/api/debug/reset")
    .visit("/")
  });

  it("should navigate to Tuesday", () => {
    cy.request("http://localhost:8001/api/debug/reset")
      .visit("/")
      .contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
 
});