import { inject } from '@angular/core';

import {
    CanActivateFn,
    Router,
} from '@angular/router';

import {
    AuthService,
} from '../services/auth.service';

export const roleGuard: CanActivateFn = (
    route
) => {

    const authService =
        inject(AuthService);

    const router =
        inject(Router);

    const requiredRoles =
        route.data?.['roles'] as
        string[] | undefined;


    /**
     * Route không khai báo roles
     * => chỉ cần đăng nhập.
     */
    if (
        !requiredRoles ||
        requiredRoles.length === 0
    ) {
        return true;
    }


    const userRoles =
        authService.getRoles();


    const allowed =
        requiredRoles.some(
            role =>
                userRoles.includes(role)
        );


    if (allowed) {
        return true;
    }


    /**
     * Đã login nhưng không có quyền.
     *
     * Hiện project chưa có trang 403,
     * tạm chuyển về trang chính.
     */
    return router.createUrlTree([
        '/',
    ]);
};