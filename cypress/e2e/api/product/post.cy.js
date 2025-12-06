describe('API /produtos', () => {
  const api = Cypress.env('apiUrl');

  let userId;
  let token;
  let userData;
  let productData;

  before(() => {
    cy.fixture('api/user').then((user) => {
      userData = user;

      cy.fixture('api/product').then((product) => {
        productData = product;
      });

      cy.createUserAPI(userData).then((id) => {
        userId = id;

        cy.loginAPI(userData).then((authorization) => {
          token = authorization;
        });
      });
    });
  });
  it('CT01 - Deve cadastrar produto com sucesso', () => {
    cy.api({
      method: 'POST',
      url: `${api}/produtos`,
      body: {
        nome: productData.name,
        preco: productData.price,
        descricao: productData.description,
        quantidade: productData.amount,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.not.be.empty;
    });
  });

  after(() => {
    cy.deleteUserAPI(userId);
  });
});
