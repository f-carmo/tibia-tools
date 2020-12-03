import { Attribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Timer } from '../model/timer';

@Component({
  selector: 'app-cooldown-card',
  templateUrl: './cooldown-card.component.html',
  styleUrls: ['./cooldown-card.component.css']
})
export class CooldownCardComponent implements OnInit {

  @Input() timer: Timer;
  @Output() destroy = new EventEmitter<Number>();
  @Output() paused = new EventEmitter<boolean>();
  @Output() unpaused = new EventEmitter<boolean>();

  get isActive() {
    return this.timer.active && this.timer.intervalRef !== null;
  }

  constructor(@Attribute('timer') timer: Timer) {
    this.timer = timer;
  }

  ngOnInit(): void { 
    if (this.timer.active) {
      this.timer.resumeTimer();
    }
  }

  destroyCard() {
    this.timer.pauseTimer();
    this.destroy.emit(this.timer.id);
  }

  reset() {
    this.timer.pauseTimer();
    this.paused.emit(true);
  }

  activate() {
    this.timer.restartTimer();
    this.unpaused.emit(true);
  }
}

export function createNewCard(timer: Timer) {
  return new CooldownCardComponent(timer);
}