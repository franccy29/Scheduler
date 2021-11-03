describe("appointments", () => {
  //reset and be sure all is loaded before each it
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    // get the add function and click it(first one)
    cy.get('[alt=Add]')
    .first()
    .click()
    // type allo in the input
    cy.get("input")
    .type("Lydia Miller-Jones")
    // choose the interviewer
    cy.get("[alt='Sylvia Palmer']")
    .click()
    // click save
    cy.get("button.button--confirm")
    .click();
    // verify
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit the first appointment", () => { 
    //target the appointment and force click on edit
    cy.get("[alt=Edit]")
      .first()
      .click({force: true})
    // clear the input and add Edited as the student name
    cy.get("input")
      .clear()
      .type("Edited")
    // choose the other interviewer
    cy.get("[alt='Tori Malcolm']")
      .click()
    // click the confirm button
    cy.get("button.button--confirm")
      .click();
    // verify
      cy.contains(".appointment__card--show", "Edited");
      cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel the first interview", () => {
    // target the first appointment and force click on delete
  cy.get("[alt=Delete]")
    .first()
    .click({force: true})
    // confirm the deleting
  cy.get("button.button--danger")
    .contains("Confirm")
    .click();
    // verify
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });

});