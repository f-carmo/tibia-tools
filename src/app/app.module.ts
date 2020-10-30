import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CooldownCardComponent } from './cooldown-card/cooldown-card.component';
import { CooldownListComponent } from './cooldown-list/cooldown-list.component';
import { CooldownFormComponent } from './cooldown-form/cooldown-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageComponent } from './storage/storage.component';

@NgModule({
  declarations: [
    AppComponent,
    CooldownCardComponent,
    CooldownListComponent,
    CooldownFormComponent,
    StorageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
