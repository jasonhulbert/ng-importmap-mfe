import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MfeLifecycle } from '@mfe-shared';
import { ApplicationRef } from '@angular/core';

class Lifecycle extends MfeLifecycle {
    declare appRef?: ApplicationRef | null;

    declare appContainer?: HTMLElement | null;

    declare rootSelector?: string;

    async mount(containerId: string, rootSelector: string, props?: Record<string, unknown>): Promise<void> {
        this.appContainer = document.getElementById(containerId);
        this.rootSelector = rootSelector;

        if (!this.appContainer) {
            throw new Error(`Container with id ${containerId} not found`);
        }

        this.appContainer.innerHTML = '';

        const root = document.createElement(this.rootSelector);

        root.style.visibility = 'hidden';

        this.appContainer.appendChild(root);

        const link = await this.preloadStylesheet('/mfe-app-2/styles.css');

        this.appRef = await bootstrapApplication(AppComponent, appConfig);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const shadowRoot = root.shadowRoot;

        if (!shadowRoot) throw new Error('Shadow root not found');

        shadowRoot.appendChild(link);
    }

    async unmount(containerId: string): Promise<void> {
        if (!this.appRef) {
            console.warn('Application is not mounted, nothing to unmount');
            return;
        }

        try {
            this.appRef?.destroy();
            this.appRef = null;
        } catch (e) {
            console.error('Error during unmount:', e);
            throw e;
        }
    }
}

export default new Lifecycle();
