import { Component, ViewChild, ElementRef } from '@angular/core';
import { PartyMember } from './model/party-member';
import { Timer } from './model/timer';
import { CooldownListComponent } from './cooldown-list/cooldown-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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