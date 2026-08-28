import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import {TuiButton,TuiButtonX,TuiCheckbox,TuiIcon,TuiInput,TuiTextfield,} from '@taiga-ui/core';
import {TuiPassword,} from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ph-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiButtonX,
    TuiCheckbox,
    TuiInput,
    TuiTextfield,
    TuiIcon,
    TuiPassword,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl:'./login.component.html',
  styleUrl:'./login.component.scss',
})
export class LoginComponent {

  readonly authService =inject(AuthService);
  private readonly router =inject(Router);
  readonly loginForm =new FormGroup({
      username: new FormControl(
        'nta',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(3),
          ],
        }
      ),
      password: new FormControl(
        '123456',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(6),
          ],
        }
      ),
      rememberMe: new FormControl(
        true,
        {
          nonNullable: true,
        }
      ),
    });

  // CLEAR INPUT
  clearUsername(): void {
    this.loginForm.controls.username.setValue('');
  }

  clearPassword(): void {
    this.loginForm.controls.password.setValue('');
  }

  // LOGIN
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {
      username,
      password,
      rememberMe,
    } = this.loginForm.getRawValue();

    this.authService
      .login({
        username,
        password,
        rememberMe,
      })
      .subscribe({
        next: () => {
          void this.router.navigate([
            '/',
          ]);
        },
        error: () => {
          // AuthService đã xử lý loginError
        },

      });
  }

  // DEMO
  fillDemoCredentials(
    username: string,
    pass: string
  ): void {
    this.loginForm.patchValue({
      username,
      password: pass,
      rememberMe: true,
    });
  }

  // FORGOT PASSWORD
  onForgotPassword(): void {
    alert(
      'Vui lòng liên hệ Quản trị viên hệ thống để thiết lập lại mật khẩu.'
    );
  }

  // REGISTER
  onGoToRegister(): void {
    void this.router.navigate([
      '/register',
    ]);
  }
}