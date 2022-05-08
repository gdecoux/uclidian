import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IconSize } from './types';

@Component({
  selector: 'atrius-icon',
  template: `
    <ng-template #icon>
      <ng-content></ng-content>
    </ng-template>

    <mat-icon [ngClass]="iconClass" [color]="color">
      <ng-container *ngIf="iconName; else icon">{{ iconName }}</ng-container>
    </mat-icon>
  `,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() iconName: string;
  @Input() color: ThemePalette;
  @Input() size?: IconSize;

  get iconClass(): string {
    return this.size ?? 'normal';
  }
}
