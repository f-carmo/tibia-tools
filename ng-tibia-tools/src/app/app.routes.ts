import { Routes } from '@angular/router';
import { HuntPlannerComponent } from './hunt-planner/hunt-planner.component';
import { PartyHuntDamageAnalyzerComponent } from './party-hunt-damage-analyzer/party-hunt-damage-analyzer.component';
import { GuildScriptsComponent } from './guild-scripts/guild-scripts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hunt-planner', pathMatch: 'full' },
  { path: 'hunt-planner', component: HuntPlannerComponent },
  { path: 'party-hunt-damage-analyzer', component: PartyHuntDamageAnalyzerComponent },
  { path: 'guild-scripts', component: GuildScriptsComponent },
];
