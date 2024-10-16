import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LoginService } from '../../services/login.service';

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
  formLogin: boolean = true;
  registerForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  checked = false;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.localStorage.crearValues();
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cuidador: [false, [Validators.required]],
    });
  }

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      this.service.post(this.registerForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.setItemsAndNavigate(data);
        },
      });
    }
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.setItemsAndNavigate(data);
        },
      });
    }
  }

  setItemsAndNavigate(data: any): void {
    console.log(data);
    this.localStorage.setItem('token', data['token']);
    console.log(data['token']);
    this.localStorage.setItem('idUsuario', data['idUsuario']);
    this.localStorage.setItem('rol', data['rol']);
    this.router.navigate(['/perfil']);
  }
}
