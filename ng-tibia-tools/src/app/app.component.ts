import { Component, ViewChild, ElementRef } from '@angular/core';
import { PartyMember } from './model/party-member';
import { Timer } from './model/timer';
import { CooldownListComponent } from './cooldown-list/cooldown-list.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = 'tibia-tools';

  @ViewChild('input') textarea: ElementRef;
  @ViewChild(CooldownListComponent, {static: true}) cooldownListComponent: CooldownListComponent;
  
  addTimerToList(timer: Timer) {
    this.cooldownListComponent.addNewCard(timer);
  }

  saveAndReorder(timer: Timer) {
    this.cooldownListComponent.sortAndSave();
  }
}