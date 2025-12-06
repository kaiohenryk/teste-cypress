describe('', () => {
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
  it('', () => {});

  after(() => {
    cy.deleteUserAPI(userId);
  });
});
