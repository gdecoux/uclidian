import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActionButtonMenuItemConfig } from './action-config';

@Component({
  selector: 'atrius-action-menu-item',
  template: `
    <button mat-menu-item class="action-menu-item" [disabled]="item.disabled" (click)="onClick()">
      <atrius-icon *ngIf="item.icon" [iconName]="item.icon" [size]="item.iconSize"></atrius-icon>
      <span *ngIf="item.label">{{ item.label }}</span>
    </button>
  `,
  styleUrls: ['menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuItemComponent {
  @Input() item: ActionButtonMenuItemConfig;

  onClick() {
    if (this.item.disabled || !this.item.callback) {
      return;
    }

    this.item.callback();
  }
}
