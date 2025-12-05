import BasePage from './BasePage';

class UserRegistrationPage extends BasePage {
  selectors = {
    name: '[data-testid="nome"]',
    email: '[data-testid="email"]',
    password: '[data-testid="password"]',
    checkBox: '[data-testid="checkbox"]',
    register: '[data-testid="cadastrar"]',
  };

  typeName(name) {
    this.type(this.selectors.name, name);
  }

  typeEmail(email) {
    this.type(this.selectors.email, email);
  }

  typePassword(password) {
    this.type(this.selectors.password, password);
  }

  selectAdministratorOption() {
    this.check(this.selectors.checkBox);
  }

  clickRegister() {
    this.click(this.selectors.register);
  }
}
export default new UserRegistrationPage();
