import { ChangeDetectionStrategy, Component, computed, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDataList, TuiDropdown, } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { AuthService, } from '../../../services/auth.service';

@Component({
    selector: 'ph-user-menu',
    standalone: true,
    imports: [
        CommonModule,
        TuiDropdown,
        TuiDataList,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {

    readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    readonly isOpen = signal<boolean>(false);

    //Username lấy trực tiếp AuthService
    readonly username =
        computed(() =>
            this.authService.username() ?? ''
        );


    // Roles lấy trực tiếp AuthService
    readonly roles =
        computed(() =>
            this.authService.roles()
        );


    //role
    readonly role =
        computed(() => {

            const roles =
                this.authService.roles();

            if (!roles.length) {
                return '';
            }

            return roles.join(', ');
        });


    //email
    readonly email =
        computed(() =>
            this.authService.currentUser()?.email ?? ''
        );


    //avata
    readonly avatarInitials =
        computed(() => {
            const username =
                this.authService.username();
            if (!username) {
                return '?';
            }
            return username
                .charAt(0)
                .toUpperCase();
        });


    closeMenu(): void {
        this.isOpen.set(false);
    }

    onLogout(): void {
        this.closeMenu();
        this.authService.logout();
        void this.router.navigate([
            '/login',
        ]);
    }

    onGoToLogin(): void {
        this.authService.logout();
        void this.router.navigate([
            '/login',
        ]);
    }

}