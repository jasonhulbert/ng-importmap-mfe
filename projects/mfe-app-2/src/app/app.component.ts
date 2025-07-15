import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mfe-app-2-root',
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [RouterOutlet],
    template: `
        <h1>MFE App Two</h1>
        <router-outlet></router-outlet>
    `,
    styles: `
        :host {
            display: block;
        }
    `
})
export class AppComponent {}
