import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Timer } from '../model/timer'

@Component({
  selector: 'app-cooldown-form',
  templateUrl: './cooldown-form.component.html',
  styleUrls: ['./cooldown-form.component.css']
})
export class CooldownFormComponent implements OnInit {
  @Output() createdTimerObject: EventEmitter<Timer> = new EventEmitter();
  @Output() saveAndReorderEvent: EventEmitter<boolean> = new EventEmitter();
  timer: Timer;
  
  constructor() { }

  ngOnInit(): void {}

  create(lap: number, type: string, floor: string, name: string, respawn: string) {
    let parsedName = "(" + name + ") " + type + " " + floor + " " + respawn;
    this.createdTimerObject.emit(Timer.createInitializedTimer(parsedName, lap));
  }

  saveAndReorder() {
    this.saveAndReorderEvent.emit(true);
  }
}
