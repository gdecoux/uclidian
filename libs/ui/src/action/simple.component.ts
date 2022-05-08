import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionDisplay } from './action-utils';

@Component({
  selector: 'atrius-action-simple',
  template: `
    <button
      mat-button
      atriusActionButton
      [color]="display.color"
      [disabled]="display.disabled"
      [matTooltip]="display.tooltip || ''"
      [ngClass]="display.classList"
      (click)="onActionClick()"
    >
      <atrius-icon
        *ngIf="display.icon"
        [iconName]="display.icon"
        [size]="display.iconSize"
      ></atrius-icon>

      <span *ngIf="display.label">{{ display.label }}</span>
    </button>
  `,
  styleUrls: ['simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionSimpleComponent {
  @Input() display: ActionDisplay;
  @Output() actionClick = new EventEmitter<void>();

  onActionClick() {
    this.actionClick.emit();
  }
}
