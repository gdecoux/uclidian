export enum ButtonColor {
  None = '',
  Primary = 'primary',
  Accent = 'accent',
  Warning = 'warn',
}

export enum ButtonStyle {
  Normal = 'mat-button',
  Flat = 'mat-flat-button',
  Icon = 'mat-icon-button',
  Raised = 'mat-raised-button',
  Stroked = 'mat-stroked-button',
  MiniFab = 'mat-mini-fab',
  Fab = 'mat-fab',
}

export type ButtonClass = string | ButtonStyle | ButtonColor;
