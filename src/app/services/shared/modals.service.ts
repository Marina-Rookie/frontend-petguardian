import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private isVisibleModalReserva = new BehaviorSubject<boolean>(false);
  isVisibleModalReserva$ = this.isVisibleModalReserva.asObservable();

  private mascotaEditModal = new BehaviorSubject<any>(null);
  mascotaEditModal$ = this.mascotaEditModal.asObservable();

  private reseniasModal = new BehaviorSubject<boolean>(false);
  reseniasModal$ = this.reseniasModal.asObservable();

  private cuidadorReseniasModal = new BehaviorSubject<any>(null);
  cuidadorReseniasModal$ = this.cuidadorReseniasModal.asObservable();

  private cuidadorReservaModal = new BehaviorSubject<any>(null);
  cuidadorReservaModal$ = this.cuidadorReservaModal.asObservable();

  private recargarMascotasSubject = new BehaviorSubject<boolean>(false);
  recargarMascotas$ = this.recargarMascotasSubject.asObservable();

  showModal() {
    this.isVisibleSubject.next(true);
  }

  hideModal() {
    this.isVisibleSubject.next(false);
  }

  setMascotaEditModal(mascota: any) {
    this.mascotaEditModal.next(mascota);
  }

  showReservaModal() {
    this.isVisibleModalReserva.next(true);
  }

  hideReservaModal() {
    this.isVisibleModalReserva.next(false);
  }

  setCuidadorReseniasModal(cuidador: any) {
    this.cuidadorReseniasModal.next(cuidador);
  }

  showReseniasModal() {
    this.reseniasModal.next(true);
  }

  hideReseniasModal() {
    this.reseniasModal.next(false);
  }

  setCuidadorReservaModal(cuidador: any) {
    this.cuidadorReservaModal.next(cuidador);
  }

  triggerRecargarMascotas() {
    this.recargarMascotasSubject.next(true);
  }
}
