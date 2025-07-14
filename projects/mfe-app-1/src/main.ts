import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MfeLifecycle } from '@mfe-shared';

let appRef: any = null;

const lifecycle: MfeLifecycle = {
  async mount(containerId: string, props?: Record<string, unknown>): Promise<void> {
    const container = document.getElementById(containerId);

    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }

    try {
      appRef = await bootstrapApplication(AppComponent, appConfig);
    } catch (e) {
      console.error('Error during bootstrap:', e);
      throw e;
    }
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
}

export default lifecycle;
