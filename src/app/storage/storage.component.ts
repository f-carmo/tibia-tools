import { Component, OnInit } from '@angular/core';
import { CooldownCardComponent } from '../cooldown-card/cooldown-card.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  static createdCards: CooldownCardComponent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  static updateCards(createdCards) {
    this.createdCards = createdCards;
    this.save();
  }

  static save() {
    localStorage.removeItem('cooldownTimers');
    localStorage.setItem('cooldownTimers', JSON.stringify(this.createdCards))
  }
  
  static load() {
    return JSON.parse(localStorage.getItem('cooldownTimers'));
  }
}
