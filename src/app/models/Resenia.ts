export class Resenia {
  _id: string;
  reserva: string;
  puntuacion: number;
  comentario: string;

  constructor(id: string, reserva: string, puntuacion: number, comentario: string) {
    this._id = id;
    this.reserva = reserva;
    this.puntuacion = puntuacion;
    this.comentario = comentario;
  }
}
