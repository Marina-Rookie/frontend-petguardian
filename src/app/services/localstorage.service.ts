import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private secretKey: string = environment.secret_key;

  constructor() { }

  crearValues() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
  }

  setItem(key: string, value: string) {
    const encryptedValue = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string) {
    const encryptedValue = localStorage.getItem(key);
    try {
      if (encryptedValue) {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
      }
    } catch(e) {
      console.log('Error al desencriptar', e);
      return '';
    }
  }

  getIdUsuario() {
    return this.getItem('idUsuario');
  }

  getRol() {
    return this.getItem('rol');
  }
  
  getIsCliente() {
    return this.getRol() === 'Cliente';
  }

  getIsCuidadorPendiente() {
    return this.getRol() === 'Cuidador Pendiente';
  }

  getIsCuidador() {
    const rol = this.getRol();
    return rol === 'Cuidador Habilitado' || rol === 'Cuidador Pendiente';
  }

  getIsAdmin() {
    return this.getRol() === 'Administrador';
  }

  getIsCuidadorHabilitado() {
    return this.getRol() === 'Cuidador Habilitado';
  }
}
