import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hunt } from '../model/hunt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hunt-card',
  standalone: true,
  templateUrl: './hunt-card.component.html',
  styleUrls: ['./hunt-card.component.css'],
  imports: [CommonModule]
})
export class HuntCardComponent implements OnInit {

  @Input() hunt: Hunt;
  @Input() selected: boolean = false;
  @Output() loadThis = new EventEmitter<Hunt>();
  @Output() mergeHunt = new EventEmitter<string>();
  @Output() deleteHunt = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  load() {
    this.loadThis.emit(this.hunt);
  }

  merge(huntName) {
    this.mergeHunt.emit(huntName);
  }

  deletar(huntName) {
    this.deleteHunt.emit(huntName);
  }
}
