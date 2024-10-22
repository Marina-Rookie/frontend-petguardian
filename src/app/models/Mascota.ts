import { EtapaVida } from "./EtapaVida";
import { TipoMascota } from "./TipoMascota";

export class Mascota {
  _id: string;
  nombre: string;
  tipoMascota: TipoMascota;
  etapaVida: EtapaVida;
  obsComida: string;
  obsEnfermedades: string;
  obsOtros: string;
  usuario: any;
  urlImagen: string = '';

  constructor(id: string, nombre: string, tipoMascota: TipoMascota, etapaVida: EtapaVida, obsComida: string, obsEnfermedades: string, obsOtros: string){
    this._id = id;
    this.nombre = nombre;
    this.tipoMascota = tipoMascota;
    this.etapaVida = etapaVida;
    this.obsComida = obsComida;
    this.obsEnfermedades = obsEnfermedades;
    this.obsOtros = obsOtros;
  }
}
