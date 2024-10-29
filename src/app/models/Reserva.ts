import { Cliente } from "./Cliente";
import { Cuidador } from "./Cuidador";
import { Estado } from "./Estado";
import { Mascota } from "./Mascota";

export interface Reserva {
  _id: string;
  fechaInicio: string;
  fechaFin: string;
  tarifaTurno: number;
  cuidador: Cuidador;
  cliente: Cliente;
  mascotas: Mascota[];
  estado: Estado;
  contadorTurnos: number;
  numeroReserva: number;
  comentario: string;
}
