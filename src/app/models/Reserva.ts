import { Cuidador } from "./Cuidador";
import { Estado } from "./Estado";
import { Mascota } from "./Mascota";

export interface Reserva {
  _id: string;
  fechaInicio: string;
  fechaFin: string;
  tarifaTurno: number;
  cuidador: Cuidador;
  mascotas: Mascota[];
  estado: Estado;
  contadorTurnos: number;
  numeroReserva: number;
  comentario: string;
}
