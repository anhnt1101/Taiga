import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'ph-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly stroke =
    'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"';

  readonly items: MenuItem[] = [
    {
      label: 'Tổng quan',
      icon: this.svg(
        '<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-5h-6v5H4a1 1 0 0 1-1-1v-9.5z"/>',
      ),
    },
    { label: 'Tham số', icon: this.docSvg() },
    { label: 'Realtime', icon: this.docSvg() },
    { label: 'Non-Realti...', icon: this.docSvg() },
    { label: 'BAAP', icon: this.docSvg() },
    { label: 'SWIFT', icon: this.docSvg() },
    { label: 'Kiều hối', icon: this.docSvg() },
    { label: 'Tra soát', icon: this.docSvg() },
    {
      label: 'Tham số',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 11h3v3h-3z"/><path d="M7 6V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/></svg>`,
      active: true,
    },
    { label: 'Lệ phí', icon: this.docSvg() },
  ];

  readonly logoutIcon = this.svg(
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  );

  private docSvg(): string {
    return `<svg viewBox="0 0 24 24" ${this.stroke}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>`;
  }

  private svg(inner: string): string {
    return `<svg viewBox="0 0 24 24" ${this.stroke}>${inner}</svg>`;
  }
}

export { MenuComponent as IconRailComponent };
