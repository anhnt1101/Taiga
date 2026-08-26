import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiError, TuiIcon, TuiNotification, TuiTextfield } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ph-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiTextfield,
    TuiPassword,
    TuiError,
    TuiIcon,
    TuiNotification,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly authService = inject(AuthService);

  readonly loginForm = new FormGroup({
    username: new FormControl('thuanhv', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('HoangThuan@2025', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(true),
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;
    await this.authService.login({
      username: username ?? '',
      password: password ?? '',
      rememberMe: rememberMe ?? false,
    });
  }

  fillDemoCredentials(username: string, pass: string): void {
    this.loginForm.patchValue({
      username,
      password: pass,
      rememberMe: true,
    });
  }

  onForgotPassword(): void {
    alert('Vui lòng liên hệ Quản trị viên hệ thống để thiết lập lại mật khẩu.');
  }

  onGoToRegister(): void {
    this.authService.setAuthMode('register');
  }
}
