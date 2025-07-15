import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MfeLifecycle } from '@mfe-shared';

let _appRef: any = null;
let _appContainer: HTMLElement | null = null;
let _rootSelector: string | null = null;

function preloadStylesheet(href: string): Promise<HTMLLinkElement> {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve(link);
        link.onerror = reject;
        document.head.appendChild(link); // preload outside DOM first
    });
}

const lifecycle: MfeLifecycle = {
    async mount(containerId: string, rootSelector: string, props?: Record<string, unknown>): Promise<void> {
        _appContainer = document.getElementById(containerId);
        _rootSelector = rootSelector;

        if (!_appContainer) {
            throw new Error(`Container with id ${containerId} not found`);
        }

        _appContainer.innerHTML = '';

        const root = document.createElement(_rootSelector);

        root.style.visibility = 'hidden';

        _appContainer.appendChild(root);

        const link = await preloadStylesheet('/mfe-app-2/styles.css');

        _appRef = await bootstrapApplication(AppComponent, appConfig);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const shadowRoot = root.shadowRoot;

        if (!shadowRoot) throw new Error('Shadow root not found');

        shadowRoot.appendChild(link);
    },
    async unmount(containerId: string): Promise<void> {
        if (!_appRef) {
            console.warn('Application is not mounted, nothing to unmount');
            return;
        }

        try {
            await _appRef.destroy();
            _appRef = null;
        } catch (e) {
            console.error('Error during unmount:', e);
            throw e;
        }
    },
    show() {
        if (!_rootSelector) {
            console.warn('Root selector is not set, cannot show application');
            return;
        }

        const root = document.querySelector(_rootSelector) as HTMLElement;

        if (root) {
            root.style.visibility = 'visible';
        } else {
            console.warn('Root element not found, cannot show application');
        }
    },
    hide() {
        if (!_rootSelector) {
            console.warn('Root selector is not set, cannot hide application');
            return;
        }

        const root = document.querySelector(_rootSelector) as HTMLElement;

        if (root) {
            root.style.visibility = 'hidden';
        } else {
            console.warn('Root element not found, cannot hide application');
        }
    }
};

export default lifecycle;
