export class Cuidador {

    _id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    descripcionPersonal: string;
    tarifaHora: number;

    constructor(_id: string, nombre: string, apellido: string, telefono: string, email: string, descripcionPersonal: string, tarifaHora: number) {
        this._id = _id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.descripcionPersonal = descripcionPersonal;
        this.tarifaHora = tarifaHora;
    }
}