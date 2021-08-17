import { navigateTo } from "../support/pageObjects/navigationPage";

describe('Test with page objects', function () {

  beforeEach('open application', () => {
    cy.visit('/');
  });

  it('verify navigations actoss the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
  })

});
