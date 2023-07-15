import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CooldownCardComponent } from './cooldown-card/cooldown-card.component';
import { CooldownListComponent } from './cooldown-list/cooldown-list.component';
import { CooldownFormComponent } from './cooldown-form/cooldown-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageComponent } from './storage/storage.component';
import { HuntPlannerComponent } from './hunt-planner/hunt-planner.component';
import { FormsModule } from '@angular/forms';
import { HuntCardComponent } from './hunt-card/hunt-card.component';
import { PartyHuntDamageAnalyzerComponent } from './party-hunt-damage-analyzer/party-hunt-damage-analyzer.component';

@NgModule({
  declarations: [
    AppComponent,
    CooldownCardComponent,
    CooldownListComponent,
    CooldownFormComponent,
    StorageComponent,
    HuntPlannerComponent,
    HuntCardComponent,
    PartyHuntDamageAnalyzerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
