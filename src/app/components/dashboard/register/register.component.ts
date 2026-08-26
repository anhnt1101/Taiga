import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TuiButton, TuiIcon, TuiNotification, TuiTextfield } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { AuthService } from '../../../services/auth.service';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
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
    TuiTextfield,
    TuiPassword,
    TuiIcon,
    TuiNotification,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly authService = inject(AuthService);

  readonly departments = [
    'Phòng Vận hành & Thanh toán',
    'Phòng Kế toán & Tài chính',
    'Phòng Công nghệ Thông tin',
    'Phòng Quản lý Rủi ro & Tuân thủ',
    'Trung tâm Thẻ & Ngân hàng số',
    'Phòng Dịch vụ Khách hàng',
  ];

  readonly roles = [
    'Chuyên viên',
    'Chuyên viên chính',
    'Trưởng nhóm vận hành',
    'Phó phòng ban',
    'Trưởng phòng ban',
    'Quản trị viên hệ thống',
  ];

  readonly registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      department: new FormControl(this.departments[0], [Validators.required]),
      role: new FormControl(this.roles[0], [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(true, [Validators.requiredTrue]),
    },
    { validators: passwordMatchValidator }
  );

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const val = this.registerForm.value;
    await this.authService.register({
      fullName: val.fullName ?? '',
      username: val.username ?? '',
      email: val.email ?? '',
      phone: val.phone ?? '',
      department: val.department ?? this.departments[0],
      role: val.role ?? this.roles[0],
      password: val.password ?? '',
      confirmPassword: val.confirmPassword ?? '',
      acceptTerms: val.acceptTerms ?? false,
    });
  }

  onGoToLogin(): void {
    this.authService.setAuthMode('login');
  }
}
