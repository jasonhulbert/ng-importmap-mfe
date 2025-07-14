import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Host App</h1>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AppComponent {
  title = 'host-app';
}
