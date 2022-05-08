import { Component, ChangeDetectionStrategy, HostListener } from '@angular/core';

@Component({
  selector: 'atrius-action-content',
  template: `
    <div class="action-content">
      <ng-content></ng-content>
    </div>
    <div class="action-divider"></div>
  `,
  styleUrls: ['content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionContentComponent {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
