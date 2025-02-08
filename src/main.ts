import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient,  withFetch} from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {providers: [provideHttpClient(withFetch())]})
  .catch((err) => console.error(err));
