import loginPage from '../../page/LoginPage';
import userRegistrationPage from '../../page/UserRegistrationPage';

describe('Cadastro de usuário', () => {
  let userData;
  let randomEmail;
  let userID;

  before(() => {
    cy.fixture('user').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    loginPage.goToLoginPage();
  });

  it('CT01 - Deve cadastrar usuário administrador com sucesso', () => {
    randomEmail = `teste+${Date.now()}@gmail.com`;

    loginPage.clickRegister();
    userRegistrationPage.typeName(userData.name);
    userRegistrationPage.typeEmail(randomEmail);
    userRegistrationPage.typePassword(userData.password);
    userRegistrationPage.selectAdministratorOption();
    userRegistrationPage.clickRegister();

    // prettier-ignore
    cy.contains('Cadastro realizado com sucesso')
        .should('be.visible');

    // prettier-ignore
    cy.location('pathname', { timeout: 10000 })
        .should('contain','admin/home',
      );

    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Bem Vindo')
      .and('contain', userData.name);
  });

  it('CT02 - Não deve cadastrar usuário sem e-email', () => {
    loginPage.clickRegister();
    userRegistrationPage.typeName(userData.name);
    userRegistrationPage.typePassword(userData.password);
    userRegistrationPage.clickRegister();

    // prettier-ignore
    cy.contains('Email é obrigatório')
      .should('be.visible');

    // prettier-ignore
    cy.location('pathname')
      .should('contain', 'cadastrarusuarios');

    // prettier-ignore
    cy.get('.form h2')
      .should('be.visible')
      .and('contain', 'Cadastro');
  });

  after(() => {
    cy.searchUserByEmail(randomEmail).then((id) => {
      userID = id;

      if (userID) cy.deleteUserAPI(userID);
    });
  });
});
