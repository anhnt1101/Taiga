import { Injectable, computed, signal } from '@angular/core';
import { LoginCredentials, RegisterData, User } from '../models/auth.model';

const DEFAULT_USER: User = {
  id: 'USR-08892',
  username: 'thuanhv',
  fullName: 'Hoàng Văn Thuận',
  role: 'Chuyên viên',
  email: 'thuan.hv@paymenthub.vn',
  avatarInitials: 'HT',
  department: 'Phòng Vận hành & Thanh toán',
  status: 'active',
  lastLogin: 'Hôm nay lúc 08:30',
};

const STORAGE_KEY = 'ph_auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(this.getInitialUser());
  private readonly _isLoading = signal<boolean>(false);
  private readonly _loginError = signal<string | null>(null);
  private readonly _registerError = signal<string | null>(null);
  private readonly _registrationSuccess = signal<string | null>(null);
  private readonly _authMode = signal<'login' | 'register'>('login');

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());
  readonly isLoading = this._isLoading.asReadonly();
  readonly loginError = this._loginError.asReadonly();
  readonly registerError = this._registerError.asReadonly();
  readonly registrationSuccess = this._registrationSuccess.asReadonly();
  readonly authMode = this._authMode.asReadonly();

  setAuthMode(mode: 'login' | 'register'): void {
    this._authMode.set(mode);
    this._loginError.set(null);
    this._registerError.set(null);
  }

  clearMessages(): void {
    this._loginError.set(null);
    this._registerError.set(null);
    this._registrationSuccess.set(null);
  }

  private getInitialUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback in case of SSR or blocked storage
    }
    return DEFAULT_USER;
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    this._isLoading.set(true);
    this._loginError.set(null);

    // Simulate authentication API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!credentials.username || !credentials.password) {
      this._loginError.set('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      this._isLoading.set(false);
      return false;
    }

    // Flexible login validation: accept 'thuanhv' or any non-empty password
    const initials = credentials.username.length >= 2 
      ? credentials.username.substring(0, 2).toUpperCase() 
      : 'HT';

    const loggedInUser: User = {
      ...DEFAULT_USER,
      username: credentials.username,
      fullName: credentials.username === 'thuanhv' ? 'Hoàng Văn Thuận' : credentials.username,
      avatarInitials: initials,
      lastLogin: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay',
    };

    this._currentUser.set(loggedInUser);
    this._isLoading.set(false);

    try {
      if (credentials.rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      }
    } catch {
      // Ignore storage errors
    }

    return true;
  }

  async register(data: RegisterData): Promise<boolean> {
    this._isLoading.set(true);
    this._registerError.set(null);
    this._registrationSuccess.set(null);

    // Simulate backend API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!data.username || !data.fullName || !data.email || !data.password) {
      this._registerError.set('Vui lòng nhập đầy đủ các trường bắt buộc');
      this._isLoading.set(false);
      return false;
    }

    if (data.password !== data.confirmPassword) {
      this._registerError.set('Mật khẩu xác nhận không khớp');
      this._isLoading.set(false);
      return false;
    }

    if (!data.acceptTerms) {
      this._registerError.set('Vui lòng đồng ý với Điều khoản và Quy định bảo mật');
      this._isLoading.set(false);
      return false;
    }

    const initials = data.fullName
      .split(' ')
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'PH';

    const newUser: User = {
      id: 'USR-' + Math.floor(10000 + Math.random() * 90000),
      username: data.username,
      fullName: data.fullName,
      role: data.role || 'Chuyên viên',
      email: data.email,
      avatarInitials: initials,
      department: data.department || 'Phòng Vận hành & Thanh toán',
      status: 'active',
      lastLogin: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay',
    };

    // Auto login with new user and switch view
    this._currentUser.set(newUser);
    this._registrationSuccess.set('Đăng ký tài khoản thành công!');
    this._isLoading.set(false);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore
    }

    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  setCurrentUser(user: User | null): void {
    this._currentUser.set(user);
    if (user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch {
        // Ignore
      }
    }
  }
}
