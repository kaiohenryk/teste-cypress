const api = Cypress.env('apiUrl');

Cypress.Commands.add('createUserAPI', (user) => {
  cy.api({
    method: 'POST',
    url: `${api}/usuarios`,
    body: {
      nome: user.name,
      email: user.email,
      password: user.password,
      administrador: 'true',
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body._id;
  });
});

Cypress.Commands.add('deleteUserAPI', (userId) => {
  cy.api({
    method: 'DELETE',
    url: `${api}/usuarios/${userId}`,
    failOnStatusCode: false,
  }).then((response) => {
    expect([200, 204]).to.include(response.status);
  });
});

Cypress.Commands.add('loginAPI', (login) => {
  return cy
    .api({
      method: 'POST',
      url: `${api}/login`,
      body: {
        email: login.email,
        password: login.password,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      return response.body.authorization;
    });
});

Cypress.Commands.add('deleteProductAPI', (token, productId) => {
  cy.api({
    method: 'DELETE',
    url: `${api}/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add('registerProduct', (token, product) => {
  cy.api({
    method: 'POST',
    url: `${api}/produtos`,
    body: {
      nome: product.name,
      preco: product.price,
      descricao: product.description,
      quantidade: product.amount,
    },
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
    return response.body._id;
  });
});
