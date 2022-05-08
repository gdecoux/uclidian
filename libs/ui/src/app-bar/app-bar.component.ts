import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Directive,
  Input,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'atrius-app-bar-section, [atriusAppBarSection]',
  host: { class: 'atrius-app-bar-section' },
})
export class AppBarSection {
  @Input() align: 'start' | 'end' = 'start';

  @HostBinding('class')
  get alignClass() {
    return `align-${this.align}`;
  }
}

@Directive({
  selector: 'atrius-app-bar-title, [atriusAppBarTitle]',
  host: { class: 'atrius-app-bar-title' },
})
export class AppBarTitle {}

@Component({
  selector: 'atrius-app-bar',
  template: `
    <div class="atrius-app-bar">
      <ng-content select="atrius-app-bar-section"> </ng-content>
    </div>
  `,
  styleUrls: ['app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppBarComponent {}
