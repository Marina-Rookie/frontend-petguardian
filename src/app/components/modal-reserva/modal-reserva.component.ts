import { Component, Input } from '@angular/core';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalService } from '../../services/shared/modals.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-modal-reserva',
  standalone: true,
  imports: [NgZorroModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-reserva.component.html',
  styleUrl: './modal-reserva.component.scss',
})
export class ModalReservaComponent {

  @Input() cuidador: any = {};

  formReserva: FormGroup = new FormGroup({});
  isVisible = false;
  turnosDisponibles = [];
  mascotas: any = [];
  idUsuario: string = '';

  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.idUsuario = this.localStorageService.getIdUsuario();
    this.modalService.isVisibleModalReserva$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
    this.formInit();
    this.getMascotasUsuario();
  }

  formInit() {
    this.formReserva = this.fb.group({
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],
      horaTurno: [null, [Validators.required]],
      mascotas: [null, [Validators.required]],
      comentario: [null],
    });
  }

  getTurnosDisponibles() {
    console.log(this.turnosDisponibles)
    if(this.formReserva.get('fechaInicio') && this.formReserva.get('fechaFin')){
      const body = {
        cuidadorId: this.cuidador._id,
        fechaInicio: this.formReserva.get('fechaInicio')?.value,
        fechaFin: this.formReserva.get('fechaFin')?.value
      }
      console.log(body);
      this.apiService.post(body, 'turnos/disponibilidad').subscribe((res: any) => {
        console.log(res);
        this.turnosDisponibles = res;
      });
    }
  }

  getMascotasUsuario() {
    this.apiService.get('mascotas/mascotasPorUsuario/' + this.idUsuario).subscribe((res: any) => {
      this.mascotas = res;
    });
  }
  printform() {
    console.log(this.formReserva.value);
  }
  handleOk(): void {
    this.modalService.hideReservaModal();
  }

  handleCancel(): void {
    this.modalService.hideReservaModal();
  }
}
