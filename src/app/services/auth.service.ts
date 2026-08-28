import {
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  Observable,
  catchError,
  finalize,
  tap,
  throwError,
} from 'rxjs';

import { LoginCredentials, LoginRequest, LoginResponse, RegisterData, RegisterResponse, User, } from '../models/auth.model';

const STORAGE_KEY = 'ph_auth_user';
const TOKEN_KEY = 'ph_access_token';
const USERNAME_KEY = 'ph_auth_username';
const ROLES_KEY = 'ph_auth_roles';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  // AUTH TOKEN
  private readonly _token = signal<string | null>(this.readStorage(TOKEN_KEY));
  private readonly _username = signal<string | null>(this.readStorage(USERNAME_KEY));
  private readonly _roles = signal<string[]>(this.readRoles());
  readonly token = this._token.asReadonly();
  readonly username = this._username.asReadonly();
  readonly roles = this._roles.asReadonly();
  // USER
  private readonly _currentUser = signal<User | null>(
    this.getInitialUser()
  );
  readonly currentUser = this._currentUser.asReadonly();

  // STATE
  private readonly _isLoading = signal<boolean>(false);
  private readonly _loginError = signal<string | null>(null);
  private readonly _registerError = signal<string | null>(null);
  private readonly _registrationSuccess = signal<string | null>(null);
  private readonly _authMode = signal<'login' | 'register'>('login');
  readonly isLoading = this._isLoading.asReadonly();
  readonly loginError = this._loginError.asReadonly();
  readonly registerError = this._registerError.asReadonly();
  readonly registrationSuccess = this._registrationSuccess.asReadonly();
  readonly authMode = this._authMode.asReadonly();
  //Có token => đang đăng nhập
  readonly isAuthenticated = computed(() => !!this._token());

  // LOGIN
  login(
    credentials: LoginCredentials
  ): Observable<LoginResponse> {

    this._isLoading.set(true);
    this._loginError.set(null);

    const request: LoginRequest = {
      username: credentials.username,
      password: credentials.password,
    };

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(
        tap((response) => {
          this.saveAuth(
            response,
            credentials.rememberMe ?? false
          );
        }),
        catchError(
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this._loginError.set(
                'Tên đăng nhập hoặc mật khẩu không đúng'
              );
            } else if (error.status === 0) {
              this._loginError.set(
                'Không thể kết nối tới máy chủ'
              );
            } else {
              this._loginError.set(
                error.error?.message ??
                'Đăng nhập thất bại'
              );
            }
            return throwError(
              () => error
            );
          }
        ),

        finalize(() => {
          this._isLoading.set(false);
        })
      );
  }

  // REGISTER
  register(
    data: RegisterData
  ): Observable<RegisterResponse> {

    this._isLoading.set(true);
    this._registerError.set(null);
    this._registrationSuccess.set(null);

    const request: RegisterData = {
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role,
    };
    return this.http
      .post<RegisterResponse>(
        `${this.apiUrl}/register`,
        request
      )
      .pipe(
        tap(() => {
          this._registrationSuccess.set(
            'Đăng ký tài khoản thành công!'
          );
        }),
        catchError(
          (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._registerError.set(
                error.error?.message ??
                'Thông tin đăng ký không hợp lệ'
              );
            } else if (error.status === 409) {
              this._registerError.set(
                error.error?.message ??
                'Tên đăng nhập hoặc email đã tồn tại'
              );
            } else if (error.status === 0) {
              this._registerError.set(
                'Không thể kết nối tới máy chủ'
              );
            } else {
              this._registerError.set(
                error.error?.message ??
                'Đăng ký tài khoản thất bại'
              );
            }
            return throwError(
              () => error
            );
          }
        ),
        finalize(() => {
          this._isLoading.set(false);
        })
      );
  }

  // SAVE AUTH
  private saveAuth(
    response: LoginResponse,
    rememberMe: boolean
  ): void {
    /*
     * Xóa dữ liệu cũ trước.
     * Tránh trường hợp token nằm đồng thời
     * ở localStorage và sessionStorage.
     */
    this.clearAuthStorage();
    const storage =
      rememberMe
        ? localStorage
        : sessionStorage;
    try {
      storage.setItem(
        TOKEN_KEY,
        response.token
      );
      storage.setItem(
        USERNAME_KEY,
        response.username
      );
      storage.setItem(
        ROLES_KEY,
        JSON.stringify(
          response.roles
        )
      );
    } catch {
      // Ignore storage errors
    }
    this._token.set(
      response.token
    );
    this._username.set(
      response.username
    );
    this._roles.set(
      response.roles ?? []
    );
  }

  // GET AUTH
  getToken(): string | null {
    return this._token();
  }

  getUsername(): string | null {
    return this._username();
  }

  getRoles(): string[] {
    return this._roles();
  }

  // LOGOUt
  logout(): void {
    this.clearAuthStorage();
    this._token.set(null);
    this._username.set(null);
    this._roles.set([]);
    this._currentUser.set(null);
    try {
      localStorage.removeItem(
        STORAGE_KEY
      );
      sessionStorage.removeItem(
        STORAGE_KEY
      );
    } catch {
      // Ignore
    }

  }

  // STORAGE
  private readStorage(
    key: string
  ): string | null {
    try {
      return (
        localStorage.getItem(key) ??
        sessionStorage.getItem(key)
      );
    } catch {
      return null;
    }
  }

  private readRoles(): string[] {
    const raw =
      this.readStorage(
        ROLES_KEY
      );
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(
        raw
      ) as string[];
    } catch {
      return [];
    }
  }

  private clearAuthStorage(): void {
    try {
      localStorage.removeItem(
        TOKEN_KEY
      );
      localStorage.removeItem(
        USERNAME_KEY
      );
      localStorage.removeItem(
        ROLES_KEY
      );
      sessionStorage.removeItem(
        TOKEN_KEY
      );
      sessionStorage.removeItem(
        USERNAME_KEY
      );
      sessionStorage.removeItem(
        ROLES_KEY
      );
    } catch {
      // Ignore
    }
  }

  // CURRENT USER
  private getInitialUser(): User | null {
    try {
      const stored =
        localStorage.getItem(
          STORAGE_KEY
        ) ??
        sessionStorage.getItem(
          STORAGE_KEY
        );
      if (stored) {
        return JSON.parse(
          stored
        ) as User;
      }
    } catch {
      // Ignore
    }
    return null;
  }


  setCurrentUser(user: User | null): void {
    this._currentUser.set(user);
    if (!user) {
      return;
    }
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(user)
      );
    } catch {
      // Ignore
    }
  }

  // AUTH SCREEN
  setAuthMode(
    mode: 'login' | 'register'
  ): void {
    this._authMode.set(mode);
    this._loginError.set(null);
    this._registerError.set(null);
  }


  clearMessages(): void {
    this._loginError.set(null);
    this._registerError.set(null);
    this._registrationSuccess.set(null);
  }

}