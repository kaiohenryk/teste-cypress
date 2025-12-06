describe('GET /produtos', () => {
  const api = Cypress.env('apiUrl');
  it('CT01 - Deve retornar erro ao buscar produto inexistente', () => {
    const productId = 'aB2657eRgt265ty8';
    cy.api({
      method: 'GET',
      url: `${api}/produtos/${productId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Produto não encontrado');
    });
  });
});
