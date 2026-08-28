import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from '../../dashboard/user-menu/user-menu.component';

@Component({
  selector: 'ph-header',
  standalone: true,
  imports: [CommonModule, UserMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
