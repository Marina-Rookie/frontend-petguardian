import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardCuidadorComponent } from '../../components/card-cuidador/card-cuidador.component';
import { Cuidador } from '../../models/Cuidador';
import { NgZorroModule } from '../../ngzorro.module';
import { CuidadorService } from '../../services/cuidador.service';
import { ModalReseniaComponent } from '../../components/modal-resenia/modal-resenia.component';
import { ModalReservaComponent } from '../../components/modal-reserva/modal-reserva.component';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [NgZorroModule, CardCuidadorComponent, CommonModule, ReactiveFormsModule, ModalReseniaComponent, ModalReservaComponent],
  templateUrl: './cuidadores.component.html',
  styleUrls: ['./cuidadores.component.scss']
})
export class CuidadoresComponent implements OnInit {
  cuidadores: Cuidador[] = [];
  cuidadoresFiltrados: Cuidador[] = [];
  loading: boolean = false;
  searchForm: FormGroup;

  constructor(
    private cuidadorService: CuidadorService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      nombre: [''],
      puntuacion: [null]
    });
  }

  ngOnInit() {
    this.getCuidadores();
    this.searchForm.valueChanges.subscribe(() => this.filtrarCuidadores());
  }

  getCuidadores() {
    this.loading = true;
    this.cuidadorService.getCuidadoresHabilitados().subscribe({
      next: (cuidadores) => {
        this.cuidadores = cuidadores;
        this.filtrarCuidadores();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  filtrarCuidadores() {
    const { nombre, puntuacion } = this.searchForm.value;
    this.cuidadoresFiltrados = this.cuidadores.filter(cuidador => {
      const cumpleNombre = !nombre || cuidador.nombre.toLowerCase().includes(nombre.toLowerCase());
      const cumplePuntuacion = puntuacion === null || cuidador.promedioPuntuacion >= puntuacion;
      return cumpleNombre && cumplePuntuacion;
    });
  }
}
