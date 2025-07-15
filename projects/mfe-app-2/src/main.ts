import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MfeLifecycle } from '@mfe-shared';

let appRef: any = null;

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
    async mount(containerId: string, props?: Record<string, unknown>): Promise<void> {
        const container = document.getElementById(containerId);

        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }

        container.innerHTML = '';

        const root = document.createElement('mfe-app-2-root');

        container.appendChild(root);

        const link = await preloadStylesheet('/mfe-app-2/styles.css');

        appRef = await bootstrapApplication(AppComponent, appConfig);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const shadowRoot = root.shadowRoot;

        if (!shadowRoot) throw new Error('Shadow root not found');

        shadowRoot.appendChild(link);
    },
    async unmount(containerId: string): Promise<void> {
        if (!appRef) {
            console.warn('Application is not mounted, nothing to unmount');
            return;
        }

        try {
            await appRef.destroy();
            appRef = null;
        } catch (e) {
            console.error('Error during unmount:', e);
            throw e;
        }
    }
};

export default lifecycle;
