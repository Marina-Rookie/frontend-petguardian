import { Estado } from "./Estado";
import { Mascota } from "./Mascota";
export class Reserva {
  _id: number;
  fechaInicio: Date;
  fechaFin: Date;
  tarifaTurno: number;
  comentario: string;
  mascota: Mascota;
  estado: Estado;
  usuario: number;

  constructor(id: number, fechaInicio: Date, fechaFin: Date, tarifaTurno: number, comentario: string, estado: Estado, mascota: Mascota, usuario: number){
    this._id = id;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.tarifaTurno = tarifaTurno;
    this.comentario = comentario;
    this.estado = estado;
    this.mascota = mascota;
    this.usuario = usuario;
  }
}