export abstract class MfeLifecycle {
    appRef?: any = null;

    appContainer?: HTMLElement | null = null;

    rootSelector?: string | null = null;

    abstract mount(containerId: string, rootSelector: string, props?: Record<string, unknown>): Promise<void>;

    abstract unmount(containerId: string): Promise<void>;

    async preloadStylesheet(href: string): Promise<HTMLLinkElement> {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve(link);
            link.onerror = reject;

            document.head.appendChild(link); // preload
        });
    }

    show() {
        if (!this.rootSelector) {
            console.warn('Root selector is not set, cannot show application');
            return;
        }

        const root = document.querySelector(this.rootSelector) as HTMLElement;

        if (root) {
            root.style.visibility = 'visible';
        } else {
            console.warn('Root element not found, cannot show application');
        }
    }

    hide() {
        if (!this.rootSelector) {
            console.warn('Root selector is not set, cannot hide application');
            return;
        }

        const root = document.querySelector(this.rootSelector) as HTMLElement;

        if (root) {
            root.style.visibility = 'hidden';
        } else {
            console.warn('Root element not found, cannot hide application');
        }
    }
}
