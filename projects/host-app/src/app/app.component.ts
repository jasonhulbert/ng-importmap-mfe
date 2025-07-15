import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <header class="flex items-center justify-between p-4 border-b border-gray-100">
        <span>Host App</span>
        <ul class="flex flex-nowrap gap-x-4 items-center">
            <li>
                <a href="/mfe-app-1" class="text-blue-500 hover:underline">MFE App One</a>
            </li>
            <li>
                <a href="/mfe-app-2" class="text-blue-500 hover:underline">MFE App Two</a>
            </li>
        </ul>
    </header>
    <main class="block p-4" id="mfe-container"></main>
  `,
})
export class AppComponent {
  @HostBinding('class')
  protected readonly hostClass = 'block';

  title = 'host-app';
}
