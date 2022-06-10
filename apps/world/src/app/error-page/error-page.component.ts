import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'atrius-error',
  imports: [MatDividerModule],
  template: `
    <div class="container mat-typography">
      <h1>{{ code }}</h1>
      <mat-divider [vertical]="true"></mat-divider>
      <div>{{ message }}</div>
    </div>
  `,
  styleUrls: ['error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  code = 404;
  message = 'This page could not be found.';
}
