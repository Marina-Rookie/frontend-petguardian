import { Component, Input } from '@angular/core';
import { NgZorroModule } from '../../ngzorro.module';
import { ModalService } from '../../services/shared/modals.service';
import { ApiService } from '../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TurnosService } from '../../services/turnos.service';
import { MascotaService } from '../../services/mascota.service';
import { ReservaService } from '../../services/reserva.service';

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
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private msg: NzMessageService,
    private turnoService: TurnosService,
    private mascotaService: MascotaService,
    private reservaService: ReservaService
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
      clienteId: [this.idUsuario],
      cuidador: [this.cuidador._id],
      comentario: [null],
    });
  }

  getTurnosDisponibles() {
    if (
      this.formReserva.get('fechaInicio') &&
      this.formReserva.get('fechaFin')
    ) {
      const body = {
        cuidadorId: this.cuidador._id,
        fechaInicio: this.formReserva.get('fechaInicio')?.value,
        fechaFin: this.formReserva.get('fechaFin')?.value,
      };
      this.turnoService.postTurnosDisponiblidad(body).subscribe((res: any) => {
        this.turnosDisponibles = res;
      });
    }
  }

  getMascotasUsuario() {
    this.mascotaService.getMascotasPorCliente(this.idUsuario).subscribe((res: any) => {
      this.mascotas = res;
    });
  }

  postFormReserva() {
    this.reservaService.post(this.formReserva.value).subscribe({
      next: (res: any) => {
        this.msg.create('success', 'Reserva realizada con éxito');
      },
      error: (error) => {
        this.msg.create('error', error.error.message);
      },
    });
  }

  handleOk(): void {
    this.postFormReserva();
    this.modalService.hideReservaModal();
  }

  handleCancel(): void {
    this.modalService.hideReservaModal();
  }
}
