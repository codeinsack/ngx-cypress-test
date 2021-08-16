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
  it('then and wrap methods', () => {

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

  it('invoke command', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

    // 2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address');
    })

    // 3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address');
    });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked');
  });

  it('assert property', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click();
      cy.get('nb-calendar-day-picker').contains('17').click();
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Aug 17, 2021');
    });
  });

  it('radio button', () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({ force: true })
        .should('be.checked');
      cy.wrap(radioButtons)
        .eq(1)
        .check({ force: true })
        .should('be.checked');
      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked');
      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled');
    });
  });

  it('checkboxes', () => {

    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();

    // check all checkboxes
    // cy.get('[type="checkbox"]').check({ force: true })
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it.only('lists and dropdowns', () => {

    cy.visit('/');

    // 1
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

    // 2
    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click();
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)",
        }

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should('contain', itemText);
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
});
