import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { ActionMenuItem } from './action-config';
import { ActionDisplay, trackByAction } from './action-utils';

@Component({
  selector: 'atrius-action-menu',
  template: `
    <button
      mat-button
      atriusActionButton
      [color]="display.color"
      [disabled]="display.disabled"
      [matTooltip]="display.tooltip || ''"
      [ngClass]="display.classList"
      [matMenuTriggerFor]="menu"
      (click)="$event.stopPropagation()"
    >
      <atrius-icon
        *ngIf="display.icon"
        [iconName]="display.icon"
        [size]="display.iconSize"
      ></atrius-icon>

      <atrius-avatar
        *ngIf="display.avatar"
        [name]="display.avatar.name"
        [size]="display.avatar.size"
      ></atrius-avatar>

      <span *ngIf="display.label">{{ display.label }}</span>
    </button>

    <mat-menu
      #menu="matMenu"
      [hasBackdrop]="true"
      [overlapTrigger]="false"
      [xPosition]="menuPositionX"
      [yPosition]="menuPositionY"
    >
      <ng-content></ng-content>

      <ng-container *ngFor="let item of menuItems; trackBy: trackByAction">
        <atrius-action-menu-item [item]="item"></atrius-action-menu-item>
        <div *ngIf="item.divider" class="action-divider"></div>
      </ng-container>
    </mat-menu>
  `,
  styleUrls: ['menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuComponent {
  @Input() display: ActionDisplay;
  @Input() items: ActionMenuItem[];
  @Input() menuPositionX: MenuPositionX = 'before';
  @Input() menuPositionY: MenuPositionY = 'below';

  @Output() actionClick = new EventEmitter<ActionMenuItem>();

  get menuItems(): ActionMenuItem[] {
    return this.items.map((item) => ({
      ...item,
      callback: item.callback || this.defaultActionCallback(item),
    }));
  }

  trackByAction(_: number, action: ActionMenuItem | null) {
    return trackByAction(action);
  }

  defaultActionCallback(item: ActionMenuItem) {
    return () => this.actionClick.emit(item);
  }
}
