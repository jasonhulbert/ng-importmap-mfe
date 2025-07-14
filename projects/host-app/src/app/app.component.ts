import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <header>
        <h1>Host App</h1>
    </header>
    <main>
        <div id="mfe-container"></div>
    </main>
  `,
  styles: ``
})
export class AppComponent {
  title = 'host-app';
}
