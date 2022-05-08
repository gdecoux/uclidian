import { Component } from '@angular/core';

@Component({
  selector: 'atrius-shell',
  template: `
    <atrius-app-bar>
      <atrius-app-bar-section>
        <atrius-app-bar-title>Three Sixty</atrius-app-bar-title>
      </atrius-app-bar-section>
    </atrius-app-bar>

    <main>
      <ng-content></ng-content>
    </main>
  `,
  styleUrls: ['shell.component.scss'],
})
export class ShellComponent {}
