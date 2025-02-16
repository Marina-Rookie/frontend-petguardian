import { Cliente } from "./Cliente";
import { Cuidador } from "./Cuidador";
import { Estado } from "./Estado";
import { Mascota } from "./Mascota";
import { Resenia } from "./Resenia";

export interface Reserva {
  _id: string;
  fechaInicio: string;
  fechaFin: string;
  tarifaTurno: number;
  cuidador: Cuidador;
  horaTurno: number;
  cliente: Cliente;
  mascotas: Mascota[];
  estado: Estado;
  resenia?: Resenia;
  contadorTurnos: number;
  numeroReserva: number;
  comentario: string;
}
