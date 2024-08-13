export class Turno {
  _id: number;
  fechaHoraInicio: Date;
  reserva: number;

  constructor(id: number, fechaHoraInicio: Date, reserva: number) {
    this._id = id;
    this.fechaHoraInicio = fechaHoraInicio;
    this.reserva = reserva;
}}