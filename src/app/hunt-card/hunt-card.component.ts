import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hunt } from '../model/hunt';

@Component({
  selector: 'app-hunt-card',
  templateUrl: './hunt-card.component.html',
  styleUrls: ['./hunt-card.component.css']
})
export class HuntCardComponent implements OnInit {

  @Input() hunt: Hunt;
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
