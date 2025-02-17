describe('Test form registro', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Registro usuario de tipo cliente', () => {
    cy.contains('Registrarse').click();

    cy.get('input[formControlName="email"]').type('nuevo_cliente@gmail.com');
    cy.get('input[formControlName="telefono"]').type('123456789');
    cy.get('input[formControlName="password"]').type('123456');
    cy.get('input[formControlName="nombre"]').type('Nombre');
    cy.get('input[formControlName="apellido"]').type('Apellido');
    cy.get('button[type="submit"]').contains('Registrarse').click();
  });

  it('Registro usuario de tipo cuidador', () => {
    cy.contains('Registrarse').click();

    cy.get('input[formControlName="email"]').type('nuevo_cuidador@gmail.com');
    cy.get('input[formControlName="telefono"]').type('987654321');
    cy.get('input[formControlName="password"]').type('123456');
    cy.get('input[formControlName="nombre"]').type('NombreCuidador');
    cy.get('input[formControlName="apellido"]').type('ApellidoCuidador');
    cy.get('label[nz-checkbox]').click(); // Marca el checkbox de cuidador inicialmente en false

    cy.get('button[type="submit"]').contains('Registrarse').click();
  });
});
