/// <reference types="cypress" />

describe('API', () => {
  beforeEach('login to the app', () => {
    cy.intercept('GET', '**/tags', { fixtures: 'tags.json' });
    cy.login();
  })

  it('api', () => {

    cy.server();
    cy.intercept('POST', '**/articles', req => {
      req.reply(res => {
        expect(res.body.article.description).to.equal('This is a description');
        res.body.article.description = "This is a description 2";
      })
    }).as('postArticles');

    cy.contains('New Article').click();
    cy.get('.title').type('This is a title');
    cy.get('.description').type('This is a description');
    cy.get('.article').type('This is a article');
    cy.contains('Publish Article').click();

    cy.wait('@postArticles');
    cy.get('@postArticles').then(xhr => {
      expect(xhr.response.statusCode).toEqual(200);
      expect(xhr.request.body.article.body).to.equal('This is a article');
      expect(xhr.response.body.article.descriotion).to.equal('This is a description');
    });
  });

  it('should give tags with routing object', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')

    cy.intercept('GET', '**/articles/feed*', { "articles": [],"articlesCount": 0 });
    cy.intercept({ method: 'GET', path: 'articles' }, { fixture: 'articles.json' });

    cy.fixture('articles').then(file => {
      const articleLink = file.articles[1].slug;
      cy.intercept('POST', '**/articles/' + articleLink + '/favorite', file);
    })
  });

});
