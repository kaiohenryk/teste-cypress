import loginPage from '../../page/LoginPage';
import userRegistrationPage from '../../page/UserRegistrationPage';

describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT01 - Deve cadastrar usuário administrador com sucesso', () => {
    cy.fixture('web/user').then((userData) => {
      const randomEmail = `teste+${Date.now()}@gmail.com`;

      loginPage.clickRegister();
      userRegistrationPage.typeName(userData.name);
      userRegistrationPage.typeEmail(randomEmail);
      userRegistrationPage.typePassword(userData.password);
      userRegistrationPage.selectAdministratorOption();
      userRegistrationPage.clickRegister();

      cy.get('div.alert.alert-dismissible.alert-primary a.alert-link')
        .should('be.visible')
        .and('contain', 'Cadastro realizado com sucesso');

      cy.location('pathname', { timeout: 10000 }).should('contain', 'admin/home');
      cy.get('h1').should('contain', 'Bem Vindo').and('contain', userData.name);
    });
  });

  it('CT02 - Não deve cadastrar usuário sem e-email', () => {
    cy.fixture('web/user').then((userData) => {
      loginPage.clickRegister();
      userRegistrationPage.typeName(userData.name);
      userRegistrationPage.typePassword(userData.password);
      userRegistrationPage.clickRegister();

      cy.contains('Email é obrigatório').should('be.visible');
      cy.location('pathname').should('contain', 'cadastrarusuarios');
      cy.get('.form h2').should('contain', 'Cadastro');
    });
  });
});
