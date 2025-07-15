import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { loadMfe, MfeLifecycle } from '@mfe-shared';

(async () => {
    try {
        await bootstrapApplication(AppComponent, appConfig);
    } catch (e) {
        console.error('Failed to bootstrap application:', e);
    }

    let mfe: MfeLifecycle = await loadMfe('mfe-app-1');

    if (!mfe) {
        console.error('Failed to load MFE lifecycle');

        return;
    }

    await mfe.mount('mfe-container', 'mfe-app-1-root', { someProp: 'value' });

    mfe.show();
})();
