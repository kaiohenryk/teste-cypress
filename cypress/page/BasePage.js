export class BasePage {
  get(selector) {
    return cy.get(selector);
  }

  click(selector) {
    return this.get(selector).click();
  }

  type(selector, text) {
    return this.get(selector).type(text);
  }

  check(selector) {
    return this.get(selector).check();
  }
}
