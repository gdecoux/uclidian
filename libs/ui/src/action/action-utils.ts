import { isEmpty } from 'lodash-es';
import { IconSize } from '../icon';
import { ButtonClass, ButtonColor, ButtonStyle } from './action-button';
import { ActionAvatarConfig, ActionConfig } from './action-config';

export interface ActionDisplay {
  readonly classList: ButtonClass[];
  readonly color?: ButtonColor;
  readonly disabled?: boolean;
  readonly icon?: string;
  readonly iconSize?: IconSize;
  readonly label?: string;
  readonly tooltip?: string;
  readonly avatar?: ActionAvatarConfig;
}

export function getButtonClassList(config: ActionConfig, showLabel: boolean = false) {
  const classList: string[] = [];

  if (config.style) {
    classList.push(config.style);
  }

  if (!config.style && !showLabel) {
    classList.push(ButtonStyle.Icon);
  }

  if (!config.style && showLabel) {
    classList.push(ButtonStyle.Normal);
  }

  if (config.compact) {
    classList.push('compact');
  }

  return classList;
}

export function getTooltip(config: ActionConfig, defaultLabel = false): string | undefined {
  if (typeof config.tooltip === 'string') {
    return config.tooltip;
  }

  if (config.tooltip || defaultLabel) {
    return config.label;
  }

  return undefined;
}

export function trackByAction(action: ActionConfig | null) {
  return action && (action.id || action.label);
}

export const ActionType = {
  Default: 'Default',
  Menu: 'Menu',
};

export type ActionType = typeof ActionType[keyof typeof ActionType];

export const getActionType = (config: ActionConfig): ActionType => {
  if (!isEmpty(config.menuItems)) {
    return ActionType.Menu;
  }

  return ActionType.Default;
};
