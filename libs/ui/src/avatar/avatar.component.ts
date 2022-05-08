import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AvatarSize } from './types';

@Component({
  selector: 'atrius-avatar',
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    <div class="avatar" [ngClass]="avatarClass">
      <ng-container *ngIf="name; else content">{{ name | initials: initialsSize }}</ng-container>
    </div>
  `,
  styleUrls: ['avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() round = true;
  @Input() size?: AvatarSize = 'small';
  @Input() name?: string;
  @Input() initialsSize?: number = 1;

  get avatarClass() {
    const classList = [];

    classList.push(this.size ?? 'small');

    if (this.round) {
      classList.push('round');
    }

    return classList;
  }
}
