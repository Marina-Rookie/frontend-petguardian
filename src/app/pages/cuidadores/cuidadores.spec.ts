import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuidadoresComponent } from './cuidadores.component';
import { CuidadorService } from '../../services/cuidador.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Cuidador } from '../../models/Cuidador';
import { NgZorroModule } from '../../ngzorro.module';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';
import { ModalReseniaComponent } from '../../components/modal-resenia/modal-resenia.component';
import { ModalReservaComponent } from '../../components/modal-reserva/modal-reserva.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('CuidadoresComponent', () => {
  let component: CuidadoresComponent;
  let fixture: ComponentFixture<CuidadoresComponent>;
  let mockCuidadorService: jasmine.SpyObj<CuidadorService>;

  beforeEach(async () => {
    mockCuidadorService = jasmine.createSpyObj('CuidadorService', [
      'getCuidadoresHabilitados',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CuidadoresComponent,
        NgZorroModule,
        CardCuidadorComponent,
        CommonModule,
        ReactiveFormsModule,
        ModalReseniaComponent,
        ModalReservaComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CuidadorService, useValue: mockCuidadorService },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadoresComponent);
    component = fixture.componentInstance;
  });

  it('Tiene que crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Tiene qeu inicializar el formulario correctamente', () => {
    expect(component.searchForm.value).toEqual({
      nombre: '',
      puntuacion: null,
    });
  });

  it('Obtiene los cuidadores al inicializar el comp', () => {
    const cuidadoresMock: Cuidador[] = [
      new Cuidador(
        '1',
        'Juan',
        'Perez',
        '12345678',
        'juan@mail.com',
        'Amante de los animales',
        15,
        'imagen1'
      ),
      new Cuidador(
        '2',
        'Ana',
        'Gomez',
        '87654321',
        'ana@mail.com',
        'Cuidadora con experiencia',
        20,
        'imagen2'
      ),
    ];

    cuidadoresMock[0].promedioPuntuacion = 4.5;
    cuidadoresMock[1].promedioPuntuacion = 3.8;

    mockCuidadorService.getCuidadoresHabilitados.and.returnValue(
      of(cuidadoresMock)
    );

    component.ngOnInit();

    expect(mockCuidadorService.getCuidadoresHabilitados).toHaveBeenCalled();
    expect(component.cuidadores).toEqual(cuidadoresMock);
    expect(component.cuidadoresFiltrados).toEqual(cuidadoresMock);
  });

  it('Filtra cuidadores por nombre', () => {
    component.cuidadores = [
      new Cuidador(
        '1',
        'Juan',
        'Perez',
        '12345678',
        'juan@mail.com',
        'Amante de los animales',
        15,
        'imagen1'
      ),
      new Cuidador(
        '2',
        'Ana',
        'Gomez',
        '87654321',
        'ana@mail.com',
        'Cuidadora con experiencia',
        20,
        'imagen2'
      ),
    ];

    component.searchForm.setValue({ nombre: 'Juan', puntuacion: null });

    component.filtrarCuidadores();

    expect(component.cuidadoresFiltrados.length).toBe(1);
    expect(component.cuidadoresFiltrados[0].nombre).toBe('Juan');
  });

  it('Filtrar cuidadores por puntuación', () => {
    const cuidador1 = new Cuidador(
      '1',
      'Juan',
      'Perez',
      '12345678',
      'juan@mail.com',
      'Amante de los animales',
      15,
      'imagen1'
    );
    const cuidador2 = new Cuidador(
      '2',
      'Ana',
      'Gomez',
      '87654321',
      'ana@mail.com',
      'Cuidadora con experiencia',
      20,
      'imagen2'
    );

    cuidador1.promedioPuntuacion = 4.5;
    cuidador2.promedioPuntuacion = 3.8;

    component.cuidadores = [cuidador1, cuidador2];

    component.searchForm.setValue({ nombre: '', puntuacion: 4 });

    component.filtrarCuidadores();

    expect(component.cuidadoresFiltrados.length).toBe(1);
    expect(component.cuidadoresFiltrados[0].nombre).toBe('Juan');
  });
});
