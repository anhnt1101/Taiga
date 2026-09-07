import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService, } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    /**
     * Không có token
     * => chưa đăng nhập
     */
    if (!token) {

        authService.logout();

        return router.createUrlTree(
            ['/login'],
            {
                queryParams: {
                    returnUrl: state.url,
                },
            }
        );
    }


    /**
     * Có token nhưng hết hạn
     */
    if (isTokenExpired(token)) {
        authService.logout();
        return router.createUrlTree(
            ['/login'],
            {
                queryParams: {
                    returnUrl: state.url,
                },
            }
        );
    }

    /**
     * Token còn hợp lệ
     */
    return true;
};

/**
 * Kiểm tra thời hạn JWT
 */
function isTokenExpired(
    token: string
): boolean {

    try {
        const payload = token.split('.')[1];
        if (!payload) {
            return true;
        }
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded =
            JSON.parse(
                decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                )
            );
        /**
         * JWT không có exp
         * => coi như không hợp lệ
         */
        if (!decoded.exp) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return (
            decoded.exp <= currentTime
        );
    } catch (error) {
        console.error('JWT không hợp lệ:', error);
        return true;
    }
}