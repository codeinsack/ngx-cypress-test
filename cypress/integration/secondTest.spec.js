/// <reference types="cypress" />

describe('API', () => {
  beforeEach('login to the app', () => {
    cy.server();
    cy.route('GET', '**/tags', 'fixtures:tags.json');
    cy.login();
  })

  it('api', () => {

    cy.server();
    cy.route('POST', '**/articles').as('postArticles');

    cy.contains('New Article').click();
    cy.get('.title').type('This is a title');
    cy.get('.description').type('This is a description');
    cy.get('.article').type('This is a article');
    cy.contains('Publish Article').click();

    cy.wait('@postArticles');
    cy.get('@postArticles').then(xhr => {
      expect(xhr.status).toEqual(200);
      expect(xhr.request.body.article.body).to.equal('This is a article');
      expect(xhr.response.body.article.descriotion).to.equal('This is a description');
    });
  });

  it('should give tags with routing object', () => {
    cy.get('.tag-list')
      .should('contain', 'cypress')
      .and('contain', 'automation')
      .and('contain', 'testing')

    cy.route('GET', '**/articles/feed*', '{"articles":[],"articlesCount":0}');
    cy.route('GET', '**/articles*', 'fixture:articles.json');

    cy.fixture('articles').then(file => {
      const articleLink = file.articles[1].slug;
      cy.route('POST', '**/articles/' + articleLink + '/favorite', file);
    })
  });

});
