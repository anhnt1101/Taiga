import { HttpErrorResponse,HttpInterceptorFn} from '@angular/common/http'
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {catchError,throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn =
    (req, next) => {

        const authService =
            inject(AuthService);

        const router =
            inject(Router);

        const token =
            authService.getToken();

        /*
         * Login/Register không cần Bearer token.
         */
        const isAuthRequest =
            req.url.includes('/api/auth/');

        const request =
            token && !isAuthRequest

                ? req.clone({

                    setHeaders: {

                        Authorization:
                            `Bearer ${token}`

                    }

                })

                : req;

        return next(request).pipe(

            catchError(
                (error: HttpErrorResponse) => {

                    /*
                     * 401 của login:
                     * sai username/password
                     *
                     * Không logout/redirect.
                     */
                    if (
                        error.status === 401 &&
                        !isAuthRequest
                    ) {

                        authService.logout();

                        void router.navigate([
                            '/login'
                        ]);

                    }

                    return throwError(
                        () => error
                    );
                }
            )
        );
    };