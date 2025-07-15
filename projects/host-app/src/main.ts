import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { loadMfe } from '@mfe-shared';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    loadMfe('mfe-app-1')
      .then((mfe) => {
          mfe.mount('mfe-container', 'mfe-app-1-root', { someProp: 'value' })
              .then(() => mfe.show?.())
              .catch(err => console.error('Failed to load mfe:', err))
      });
  })
  .catch((err) => console.error(err));
