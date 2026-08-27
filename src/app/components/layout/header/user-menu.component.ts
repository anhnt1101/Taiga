import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { TuiAvatar, TuiBadge, TuiChevron } from '@taiga-ui/kit';
import { AuthService } from '../../../services/auth.service';

export interface UserProfile {
    fullName: string;
    role: string;
    email: string;
    department: string;
    username: string;
    avatarInitials: string;
    lastLogin: string;
}

@Component({
    selector: 'ph-user-menu',
    standalone: true,
    imports: [CommonModule, TuiDropdown, TuiDataList],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
    readonly authService = inject(AuthService);
    readonly isOpen = signal<boolean>(false);

    readonly user: UserProfile = {
        fullName: 'Hoàng Văn Thuận',
        role: 'Chuyên viên',
        email: 'thuan.hv@paymenthub.vn',
        department: 'Phòng Vận hành & Thanh toán',
        username: 'thuanhv',
        avatarInitials: 'HT',
        lastLogin: '26/08/2025 09:15',
    };

    closeMenu(): void {
        this.isOpen.set(false);
    }

    onLogout(): void {
        this.closeMenu();
        this.authService.logout();
    }

    onGoToLogin(): void {
        this.authService.logout();
    }
}
