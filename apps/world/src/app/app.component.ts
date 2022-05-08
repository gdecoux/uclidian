import { Component } from '@angular/core';

@Component({
  selector: 'atrius-root',
  template: `
    <atrius-shell>
      <router-outlet></router-outlet>
    </atrius-shell>
  `,
})
export class AppComponent {}
