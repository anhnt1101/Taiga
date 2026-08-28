import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { TuiButton, TuiButtonX, TuiDropdown, TuiIcon, TuiInput, TuiNotification, TuiTextfield, } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiPassword, TuiSelect, } from '@taiga-ui/kit';
import { TuiForm } from '@taiga-ui/layout';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }
  if (password.value !== confirmPassword.value) {
    const currentErrors = confirmPassword.errors ?? {};

    confirmPassword.setErrors({
      ...currentErrors,
      passwordMismatch: true,
    });

    return {
      passwordMismatch: true,
    };
  }

  // Khi password khớp lại thì chỉ xóa lỗi passwordMismatch
  if (confirmPassword.hasError('passwordMismatch')) {
    const errors = {
      ...(confirmPassword.errors ?? {}),
    };

    delete errors['passwordMismatch'];

    confirmPassword.setErrors(
      Object.keys(errors).length > 0
        ? errors
        : null
    );
  }
  return null;
};

@Component({
  selector: 'ph-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButton,
    TuiButtonX,
    TuiInput,
    TuiTextfield,
    TuiIcon,
    TuiNotification,
    TuiDropdown,
    TuiPassword,
    TuiSelect,
    TuiChevron,
    TuiDataListWrapper,
    TuiForm,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly roles: string[] = ['ROLE_USER', 'ROLE_ADMIN',];

  readonly registerForm = new FormGroup({
    username: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
        ],
      }
    ),
    email: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email,
        ],
      }
    ),
    role: new FormControl(
      'ROLE_USER',
      {
        nonNullable: true,
        validators: [
          Validators.required,
        ],
      }
    ),
    password: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
        ],
      }
    ),
    confirmPassword: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
        ],
      }
    ),
  },
    {
      validators:
        passwordMatchValidator,
    }
  );

  // CLEAR INPUT
  clearUsername(): void {
    this.registerForm.controls.username.setValue('');
  }

  clearEmail(): void {
    this.registerForm.controls.email.setValue('');
  }

  clearPassword(): void {
    this.registerForm.controls.password.setValue('');
  }

  clearConfirmPassword(): void {
    this.registerForm.controls.confirmPassword.setValue('');
  }

  // SUBMIT
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const val = this.registerForm.getRawValue();
    this.authService
      .register({
        username: val.username,
        password: val.password,
        email: val.email,
        role: val.role,
      })
      .subscribe({
        next: () => {
          void this.router.navigate([
            '/login',
          ]);
        },
        error: (err) => {
          console.error(
            'Register failed:',
            err
          );
        },
      });
  }

  // LOGIN
  onGoToLogin(): void {
    void this.router.navigate([
      '/login',
    ]);
  }

}