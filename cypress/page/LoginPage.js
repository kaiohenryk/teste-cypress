import { BasePage } from './BasePage';

class LoginPage extends BasePage {
  selectors = {
    email: '[data-testid="email"]',
    password: '[data-testid="senha"]',
    btnEnter: '[data-testid="entrar"]',
    register: '[data-testid="cadastrar"]',
  };

  typeEmail(email) {
    this.type(this.selectors.email, email);
  }

  typePassword(password) {
    this.type(this.selectors.password, password);
  }

  clickEnter() {
    this.click(this.selectors.btnEnter);
  }

  clickRegister() {
    this.click(this.selectors.register);
  }
}
export default new LoginPage();
