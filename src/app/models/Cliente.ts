export interface Cliente {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  eliminado: boolean;
  domicilio: string;
  telefono: string;
  contactoEmergencia: number;
  nombreContactoEmergencia: string;
  imagenPerfil: string;
}
