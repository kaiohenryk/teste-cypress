describe('POST /produtos', () => {
  const api = Cypress.env('apiUrl');

  let userId;
  let token;
  let userData;
  let productData;
  let productId;

  before(() => {
    cy.fixture('user').then((user) => {
      userData = user;

      cy.fixture('product').then((product) => {
        productData = product.create;

        cy.createUserAPI(userData).then((id) => {
          userId = id;

          cy.loginAPI(userData).then((authorization) => {
            token = authorization;
          });
        });
      });
    });
  });
  it('CT01 - Cadastrar produto com sucesso', () => {
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
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body._id).to.not.be.empty;

      productId = response.body._id;
    });
  });

  after(() => {
    if (productId) cy.deleteProductAPI(token, productId);
    if (userId) cy.deleteUserAPI(userId);
  });
});
