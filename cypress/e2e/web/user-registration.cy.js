import loginPage from '../../page/LoginPage';
import userRegistrationPage from '../../page/UserRegistrationPage';

describe('Cadastro de usuário', () => {
  let webUserData;

  before(() => {
    cy.fixture('api/user').then((data) => {
      webUserData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('CT01 - Deve cadastrar usuário administrador com sucesso', () => {
    const randomEmail = `teste+${Date.now()}@gmail.com`;

    loginPage.clickRegister();
    userRegistrationPage.typeName(webUserData.name);
    userRegistrationPage.typeEmail(randomEmail);
    userRegistrationPage.typePassword(webUserData.password);
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
      .should('contain', 'Bem Vindo')
      .and('contain', webUserData.name);
  });

  it('CT02 - Não deve cadastrar usuário sem e-email', () => {
    loginPage.clickRegister();
    userRegistrationPage.typeName(webUserData.name);
    userRegistrationPage.typePassword(webUserData.password);
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
});
