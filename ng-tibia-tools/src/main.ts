import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Angular 20 style
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(), // ✅ enables animations engine
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 2000,
        progressBar: true
      })
    )
  ]
}).catch(err => console.error(err));