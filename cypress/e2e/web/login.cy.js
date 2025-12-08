import loginPage from '../../page/LoginPage';

describe('Login', () => {
  let userId;
  let userData;

  before(() => {
    cy.fixture('user').then((data) => {
      userData = data;

      return cy.createUserAPI(userData).then((id) => {
        userId = id;
      });
    });
  });

  beforeEach(() => {
    loginPage.goToLoginPage();
  });
  it('CT01 - Deve realizar login com sucesso', () => {
    loginPage.typeEmail(userData.email);
    loginPage.typePassword(userData.password);
    loginPage.clickEnter();

    // prettier-ignore
    cy.location('pathname')
      .should('contain', 'admin/home');

    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Bem Vindo')
      .and('contain', userData.name);
  });

  after(() => {
    if (userId) cy.deleteUserAPI(userId);
  });
});
