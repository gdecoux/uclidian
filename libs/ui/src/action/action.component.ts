import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { tuiPure } from '@taiga-ui/cdk';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { ActionConfig, ActionMenuItem } from './action-config';
import { ButtonColor } from './action-button';
import {
  ActionDisplay,
  ActionType,
  getActionType,
  getButtonClassList,
  getTooltip,
} from './action-utils';

@Component({
  selector: 'atrius-action',
  template: `
    <ng-container *ngIf="config" [ngSwitch]="actionType">
      <atrius-action-menu
        *ngSwitchCase="'Menu'"
        [display]="display"
        [items]="config.menuItems!"
        [menuPositionX]="menuPositionX"
        [menuPositionY]="menuPositionY"
        (actionClick)="onActionClick($event)"
      >
        <ng-content select="atrius-action-content"></ng-content>
      </atrius-action-menu>

      <atrius-action-simple
        *ngSwitchDefault
        [display]="display"
        (actionClick)="onActionClick()"
      ></atrius-action-simple>
    </ng-container>
  `,
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent {
  @Input() config: ActionConfig;
  @Input() color: ButtonColor;
  @Input() showIcon: boolean;
  @Input() showLabel: boolean;
  @Input() menuPositionX: MenuPositionX = 'before';
  @Input() menuPositionY: MenuPositionY = 'below';

  @Output() actionClick = new EventEmitter<ActionConfig | ActionMenuItem>();

  get display(): ActionDisplay {
    return this.generateActionDisplay(this.config, this.color, this.showLabel, this.showIcon);
  }

  get actionType(): ActionType {
    return getActionType(this.config);
  }

  onActionClick(event?: ActionMenuItem) {
    const action = event || this.config;

    if (!action.disabled) {
      this.callback(action);
      this.actionClick.emit(action);
    }
  }

  @tuiPure
  generateActionDisplay(
    config: ActionConfig,
    color: ButtonColor,
    showLabel: boolean,
    showIcon: boolean
  ): ActionDisplay {
    return {
      classList: getButtonClassList(config, showLabel),
      color: color || config.color || ButtonColor.None,
      disabled: config.disabled,
      icon: showIcon ? config.icon : undefined,
      iconSize: config.iconSize || 'normal',
      label: showLabel ? config.label : undefined,
      tooltip: getTooltip(config, !this.showLabel),
      avatar: config.avatar,
    };
  }

  private callback(action: ActionConfig | ActionMenuItem) {
    if (action.callback) action.callback();
  }
}
