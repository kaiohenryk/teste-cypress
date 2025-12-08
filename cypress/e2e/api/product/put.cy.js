describe('POST /produtos', () => {
  const api = Cypress.env('apiUrl');

  let userId;
  let token;
  let userData;
  let createProductData;
  let updateProductData;
  let productId;

  before(() => {
    cy.fixture('api/user').then((user) => {
      userData = user;

      cy.fixture('product').then((product) => {
        createProductData = product.create;
        updateProductData = product.update;

        cy.createUserAPI(userData).then((id) => {
          userId = id;

          cy.loginAPI(userData).then((authorization) => {
            token = authorization;

            cy.registerProduct(token, createProductData).then((id) => {
              productId = id;
            });
          });
        });
      });
    });
  });
  it('CT01 - Atualizar produto com sucesso', () => {
    cy.api({
      method: 'PUT',
      url: `${api}/produtos/${productId}`,
      body: {
        nome: updateProductData.name,
        preco: updateProductData.price,
        descricao: updateProductData.description,
        quantidade: updateProductData.amount,
      },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro alterado com sucesso');
    });
  });

  after(() => {
    if (productId) cy.deleteProductAPI(token, productId);
    if (userId) cy.deleteUserAPI(userId);
  });
});
