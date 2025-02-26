export class Cuidador {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: string;
  tarifaHora: number;
  promedioPuntuacion: number;
  reservasTotales: number;
  reservasCanceladas: number;
  reservasFinalizadas: number;
  reservasAprobadas: number;
  reservasPendientes: number;
  reservasNoAprobadas: number;

  constructor(data: any) {
    this._id = data._id;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.email = data.email;
    this.telefono = data.telefono;
    this.estado = data.estado;
    this.tarifaHora = data.tarifaHora;
    this.promedioPuntuacion = data.promedioPuntuacion;
    this.reservasTotales = data.reservasTotales;
    this.reservasCanceladas = data.reservasCanceladas;
    this.reservasFinalizadas = data.reservasFinalizadas;
    this.reservasAprobadas = data.reservasAprobadas;
    this.reservasPendientes = data.reservasPendientes;
    this.reservasNoAprobadas = data.reservasNoAprobadas;
  }
}

export class Estadisticas {
  cuidadoresPendientes: number;
  cuidadoresHabilitados: number;
  cuidadoresNoHabilitados: number;
  totalCuidadores: number;
  cuidadoresFiltrados: number;
  promedioPuntuacionHabilitados: number;

  constructor(data: any) {
    this.cuidadoresPendientes = data.cuidadoresPendientes;
    this.cuidadoresHabilitados = data.cuidadoresHabilitados;
    this.cuidadoresNoHabilitados = data.cuidadoresNoHabilitados;
    this.totalCuidadores = data.totalCuidadores;
    this.cuidadoresFiltrados = data.cuidadoresFiltrados;
    this.promedioPuntuacionHabilitados = data.promedioPuntuacionHabilitados;
  }
}

export class CuidadorInforme {
  cuidadores: Cuidador[];
  estadisticas: Estadisticas;

  constructor(data: any) {
    this.cuidadores = data.cuidadores.map((cuidador: any) => new Cuidador(cuidador));
    this.estadisticas = new Estadisticas(data.estadisticas);
  }
}
