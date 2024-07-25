import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, FormsModule, NzIconModule, NzLayoutModule, NzMenuModule, NzFormModule, NzInputModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // fb = new FormBuilder();

  // validateForm: FormGroup<{
  //   userName: FormControl<string>;
  //   password: FormControl<string>;
  //   remember: FormControl<boolean>;
  // }> = this.fb.group({
  //   userName: ['', [Validators.required]],
  //   password: ['', [Validators.required]],
  //   remember: [true]
  // });

  // submitForm(): void {
  //   if (this.validateForm.valid) {
  //     console.log('submit', this.validateForm.value);
  //   } else {
  //     Object.values(this.validateForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({ onlySelf: true });
  //       }
  //     });
  //   }
  // }

}
