import loginPage from '../../page/LoginPage';

describe('Login', () => {
  let userId;
  let userData;

  before(() => {
    return cy.fixture('api/user').then((data) => {
      userData = data;

      return cy.createUserAPI(userData).then((id) => {
        userId = id;
      });
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });
  it('CT01 - Deve realizar login com sucesso', () => {
    cy.fixture('web/login').then((loginData) => {
      loginPage.typeEmail(loginData.email);
      loginPage.typePassword(loginData.password);
      loginPage.clickEnter();

      cy.location('pathname').should('contain', 'admin/home');
      cy.get('h1').should('contain', 'Bem Vindo').and('contain', loginData.name);
    });
  });

  after(() => {
    cy.deleteUserAPI(userId);
  });
});
