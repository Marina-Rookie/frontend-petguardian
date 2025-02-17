describe('Test del login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it("Iniciar sesion como cuidador", () => {
    cy.get('input[name="email"]').type("cami@test.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/perfil");
    cy.contains("Tarifa hora").should("be.visible");
  });

  it('Iniciar sesion como cliente', () => {
    cy.get('input[name="email"]').type('ema@test.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/perfil');
    cy.contains('Teléfono contacto de emergencia').should('be.visible');
  });

  it('Inicio de sesion incorrecto', () => {
    cy.get('input[name="email"]').type('usuario@incorrecto.com');
    cy.get('input[name="password"]').type('asdasdasd');
    cy.get('button[type="submit"]').click();
    cy.contains('Usuario o contraseña incorrectos').should('be.visible');
  });

});
