import { Component, OnInit, ɵConsole } from '@angular/core';
import { CooldownCardComponent, createNewCard } from '../cooldown-card/cooldown-card.component';
import { Timer } from '../model/timer';
import { StorageComponent } from '../storage/storage.component';

@Component({
  selector: 'app-cooldown-list',
  templateUrl: './cooldown-list.component.html',
  imports: [
    CooldownCardComponent
  ],
  styleUrls: ['./cooldown-list.component.css']
})
export class CooldownListComponent implements OnInit {

  cooldownCardList = [];

  constructor() { }

  ngOnInit(): void {
    this.loadSavedCards();
  }

  addNewCard(timer: Timer) {
    this.cooldownCardList.push(createNewCard(timer));
    this.sortAndSave();
  }

  removeCard(id: number) {
    this.cooldownCardList = this.cooldownCardList.filter(cardComponent => cardComponent.timer.id !== id);
    this.sortAndSave();
  }

  loadSavedCards() {
    StorageComponent.load().forEach(obj => {
      this.cooldownCardList.push(createNewCard(Timer.createFromJSON(obj.timer)));
    });

    this.sortAndSave();
  }

  sortAndSave() {
    this.sortArrayByActive();
    this.sortArrayByDate();
    StorageComponent.updateCards(this.cooldownCardList);
  }

  sortArrayByDate() {
    this.cooldownCardList.sort((cardA, cardB) => {
      if (cardA.timer.active && cardB.timer.active) {
        return cardA.timer.endTime.getTime() - cardB.timer.endTime.getTime();
      }
    });
  }

  sortArrayByActive() {
    //first: sort by active and inactive
    this.cooldownCardList.sort((cardA, cardB) => {
      if (cardA.timer.active && !cardB.timer.active) {
        return -1;
      } else if (!cardA.timer.active && cardB.timer.active) {
        return 1;
      } else {
        return 0;
      }
    });

    //then: sort inactive timers by date
    this.cooldownCardList.sort((cardA, cardB) => {
      if (!cardA.timer.active && !cardB.timer.active) {
        return cardA.timer.endTime.getTime() - cardB.timer.endTime.getTime();
      } else {
        return 0;
      }
    });
  }
}
