import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  private mascotaEditModal = new BehaviorSubject<any>(null);
  mascotaEditModal$ = this.mascotaEditModal.asObservable();

  showModal() {
    this.isVisibleSubject.next(true);
  }

  hideModal() {
    this.isVisibleSubject.next(false);
  }

  setMascotaEditModal(mascota: any) {
    this.mascotaEditModal.next(mascota);
  }

}