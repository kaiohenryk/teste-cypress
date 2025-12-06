import loginPage from '../../page/LoginPage';

describe('Login', () => {
  let userId;
  let apiUserData;
  let webLoginData;

  before(() => {
    cy.fixture('api/user').then((data) => {
      apiUserData = data;

      return cy.createUserAPI(apiUserData).then((id) => {
        userId = id;
      });
    });

    cy.fixture('web/login').then((data) => {
      webLoginData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });
  it('CT01 - Deve realizar login com sucesso', () => {
    loginPage.typeEmail(webLoginData.email);
    loginPage.typePassword(webLoginData.password);
    loginPage.clickEnter();

    // prettier-ignore
    cy.location('pathname')
      .should('contain', 'admin/home');

    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Bem Vindo')
      .and('contain', webLoginData.name);
  });

  after(() => {
    cy.deleteUserAPI(userId);
  });
});
