import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Timer, createInitializedTimer } from '../model/timer'

@Component({
  selector: 'app-cooldown-form',
  templateUrl: './cooldown-form.component.html',
  styleUrls: ['./cooldown-form.component.css']
})
export class CooldownFormComponent implements OnInit {
  @Output() createdTimerObject: EventEmitter<Timer> = new EventEmitter();
  timer: Timer;
  
  constructor() { }

  ngOnInit(): void {}

  create(lap: number, name: string) {
    this.createdTimerObject.emit(createInitializedTimer(name, lap));
  }
}
