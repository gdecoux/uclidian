import { IconSize } from '../icon';
import { AvatarSize } from '../avatar';
import { ButtonColor, ButtonStyle } from './action-button';

export interface ActionBaseConfig {
  id?: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
  callback?: () => void;
}

export interface ActionMenuItemConfig extends ActionBaseConfig {
  divider?: boolean;
  iconSize?: IconSize;
}

export interface ActionButtonMenuItemConfig extends ActionMenuItemConfig {
  callback?: () => void;
}

export type ActionMenuItem = ActionButtonMenuItemConfig;

export interface ActionAvatarConfig {
  name: string;
  size?: AvatarSize;
}

export interface ActionConfig extends ActionBaseConfig {
  tooltip?: boolean | string;
  color?: ButtonColor;
  style?: ButtonStyle;
  iconSize?: IconSize;
  compact?: boolean;
  menuItems?: ActionMenuItem[];
  avatar?: ActionAvatarConfig;
}
