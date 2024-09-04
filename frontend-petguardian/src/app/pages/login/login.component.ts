import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    CommonModule,
    FormsModule,
    NzCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm;
  formLogin: boolean = true;
  checked = false;

  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.localStorage.crearValues();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.service.post(this.loginForm.value, 'usuarios/login').subscribe({
        next: (data: any) => {
          this.localStorage.setItem('token', data['token']);
          this.localStorage.setItem('idUsuario', data['idUsuario']);
          this.localStorage.setItem('rol', data['rol']);
          this.router.navigate(['/mascotas']);
        },
      });
    }
  }
}
