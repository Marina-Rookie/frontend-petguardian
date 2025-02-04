describe('Test del login', () => {
  beforeEach(() => {
    cy.visit('/login'); // Navega a la página de login
  });

  it("Iniciar sesion como cuidador", () => {
    cy.get('input[name="email"]').type("valentinlujambio@cuidador.com"); //Desp buscar mails validos pq no me acuerdo
    cy.get('input[name="password"]').type("123456");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/perfil");
    cy.contains("Tarifa hora").should("be.visible");
  });

  it('Iniciar sesion como cliente', () => {
    cy.get('input[name="email"]').type('valentin@gmail.com'); //Desp buscar mails validos pq no me acuerdo
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

  it('Registrar usuario de tipo cliente', () => {
    cy.contains('Registrarse').click();

    cy.get('input[formControlName="email"]').type('nuevo_cliente@gmail.com');
    cy.get('input[formControlName="telefono"]').type('123456789');
    cy.get('input[formControlName="password"]').type('123456');
    cy.get('input[formControlName="nombre"]').type('Nombre');
    cy.get('input[formControlName="apellido"]').type('Apellido');
    cy.get('label[nz-checkbox]').click();
    cy.get('button[type="submit"]').contains('Registrarse').click();

    cy.url().should('include', '/perfil');
    cy.contains('Teléfono contacto de emergencia').should('be.visible');
  });

  it('Registrar usuario de tipo cuidador', () => {
    cy.contains('Registrarse').click();

    cy.get('input[formControlName="email"]').type('nuevo_cuidador@gmail.com');
    cy.get('input[formControlName="telefono"]').type('987654321');
    cy.get('input[formControlName="password"]').type('123456');
    cy.get('input[formControlName="nombre"]').type('NombreCuidador');
    cy.get('input[formControlName="apellido"]').type('ApellidoCuidador');
    cy.get('label[nz-checkbox]').click();

    cy.get('button[type="submit"]').contains('Registrarse').click();
    cy.url().should('include', '/perfil');
    cy.contains('Tarifa hora').should('be.visible');
  });

  it('Iniciar sesion como cliente', () => {
    cy.get('input[name="email"]').type('valentin@gmail.com'); //Desp buscar mails validos pq no me acuerdo
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/perfil');
    cy.contains('Teléfono contacto de emergencia').should('be.visible');
  });
});
