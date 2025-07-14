import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>MFE App Two</h1>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AppComponent {}
