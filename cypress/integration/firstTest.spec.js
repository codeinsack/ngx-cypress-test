/// <reference types="cypress" />

describe('Our first suite', () => {

  it('first test', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="imputEmail1"]');

  });


  it('second test', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="signInButton"]');

    cy.contains('Sign in');
    cy.get('#inputPassword3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click();

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  });

  // convert Cypress to JQuery context and back
  it.only('then and wrap methods', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
      expect(emailLabelFirst).to.equal('Email');
      expect(passwordLabelFirst).to.equal('Password');

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
        expect(passwordLabelSecond).to.equal(passwordLabelFirst);

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password');
      })
    });
  });
});
