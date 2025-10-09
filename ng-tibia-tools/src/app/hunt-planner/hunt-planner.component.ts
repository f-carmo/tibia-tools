import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Hunt } from '../model/hunt';
import { FormsModule } from '@angular/forms';
import { HuntCardComponent } from '../hunt-card/hunt-card.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hunt-planner',
  standalone: true,
  imports: [FormsModule, HuntCardComponent, CommonModule],
  templateUrl: './hunt-planner.component.html',
  styleUrls: ['./hunt-planner.component.css']
})
export class HuntPlannerComponent implements OnInit {

  huntsList: Hunt[] = [];

  currentHunt: Hunt | null = null;
  huntHistoryTime: string;
  huntPotionsUsed: string;
  huntArrowsUsed: string;
  huntRunesUsed: string;
  huntSpiritsUsed: string;
  huntName: string;

  plannerMinutes: string;
  plannerCapacity: string;

  resultText: string;

  MANA_POTION_CAP = 3.1;
  DIAMOND_ARROW_CAP = 0.8;
  AVALANCHE_CAP = 0.52;
  ULTIMATE_SPIRIT_CAP = 3.1;

  constructor(private cdr: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadSavedHunts();
  }

  gerarResultado() {
    const manaPerMinute = this.currentHunt.historyPotions / this.currentHunt.historyMinutes;
    const arrowPerMinute = this.currentHunt.historyArrows / this.currentHunt.historyMinutes;
    const runesPerMinute = this.currentHunt.historyRunes / this.currentHunt.historyMinutes;
    const spiritsPerMinute = this.currentHunt.historySpirits / this.currentHunt.historyMinutes;

    let resultMana = 0;
    let resultBolt = 0;
    let resultRunes = 0;
    let resultSpirits = 0;

    if (this.isTimeDefined() && this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerCapacityAux > 0 && plannerTimeAux > 0) {
        plannerTimeAux--;
        plannerCapacityAux -= (manaPerMinute * this.MANA_POTION_CAP) + (arrowPerMinute * this.DIAMOND_ARROW_CAP) + (runesPerMinute * this.AVALANCHE_CAP) + (spiritsPerMinute * this.ULTIMATE_SPIRIT_CAP);

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
        resultSpirits += spiritsPerMinute;
      }
    } else if (this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);

      while (plannerCapacityAux > 0) {
        plannerCapacityAux -= (manaPerMinute * this.MANA_POTION_CAP) + (arrowPerMinute * this.DIAMOND_ARROW_CAP) + (runesPerMinute * this.AVALANCHE_CAP) + (spiritsPerMinute * this.ULTIMATE_SPIRIT_CAP);

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
        resultSpirits += spiritsPerMinute;
      }
    } else {
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerTimeAux > 0) {
        plannerTimeAux--;

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
        resultSpirits += spiritsPerMinute;
      }
    }

    this.resultText = `Você vai precisar de:
      <br>- ${Math.floor(resultMana)} mana potions
      <br>- ${Math.floor(resultSpirits)} ultimate spirits
      <br>- ${Math.floor(resultBolt)} arrows
      <br>- ${Math.floor(resultRunes)} runas`;

    this.toastr.success('Plan generated!', 'Success');
  }

  isTimeDefined() {
    return Number.parseInt(this.plannerMinutes) > 0;
  }

  isCapDefined() {
    return Number.parseInt(this.plannerCapacity) > 0;
  }

  saveHunt() {
    const hunt = Hunt.create(this.huntName, this.huntHistoryTime, this.huntPotionsUsed, this.huntArrowsUsed, this.huntRunesUsed, this.huntSpiritsUsed);

    if (this.isValid(hunt)) {
      const huntLookup = this.huntsList.filter(savedHunt => savedHunt.name === hunt.name).pop();

      if (huntLookup) {
        if (confirm(`A hunt ${hunt.name} já existe. Deseja mergea-la?`)) {
          this.mergeHunt(hunt.name);
          return;
        } else {
          huntLookup.historyMinutes = hunt.historyMinutes;
          huntLookup.historyPotions = hunt.historyPotions;
          huntLookup.historyArrows = hunt.historyArrows;
          huntLookup.historyRunes = hunt.historyRunes;
          huntLookup.historySpirits = hunt.historySpirits;
        }
        
      } else {
        this.huntsList = [...this.huntsList, hunt];
      }

      localStorage.removeItem('huntPlanner');
      localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
      this.toastr.success('Hunt saved!', 'Success');
    }
  }

  load() {
    return JSON.parse(localStorage.getItem('huntPlanner'));
  }

  mergeHunt(huntName: string) {
    if (this.huntName === huntName) {
      const hunt = this.huntsList.filter(hunt => hunt.name === huntName).pop();

      hunt.historyMinutes = hunt.historyMinutes + Number.parseInt(this.huntHistoryTime || '0');
      hunt.historyPotions = hunt.historyPotions + Number.parseInt(this.huntPotionsUsed|| '0');
      hunt.historyArrows = hunt.historyArrows + Number.parseInt(this.huntArrowsUsed|| '0');
      hunt.historyRunes = hunt.historyRunes + Number.parseInt(this.huntRunesUsed|| '0');
      hunt.historySpirits = hunt.historySpirits + Number.parseInt(this.huntSpiritsUsed|| '0');

      this.huntHistoryTime = '';
      this.huntPotionsUsed = '';
      this.huntArrowsUsed = '';
      this.huntRunesUsed = '';
      this.huntSpiritsUsed = '';

      localStorage.removeItem('huntPlanner');
      localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
      this.toastr.success('Hunt merged!', 'Success');
    } else {
      this.toastr.success('Something went wrong :(', 'Error');
    }
  }

  deleteHunt(huntName: string) {
    this.huntsList = this.huntsList.filter(hunt => hunt.name !== huntName);
    localStorage.removeItem('huntPlanner');
    localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
    this.toastr.success('Hunt deleted!', 'Success');
  }

  loadSavedHunts() {
    const loaded = this.load();

    this.huntsList = loaded
      ? loaded.filter(obj => this.isValid(obj)).map(obj => Hunt.createFromJSON(obj))
      : [];
  }

  isValid(obj) {
    return obj.name && obj.name !== "";
  }

  loadHunt(hunt: Hunt) {
    this.currentHunt = hunt;
    this.huntName = hunt.name;
  }

  resetForm() {
    this.currentHunt = null;
    this.huntName = '';
    this.huntHistoryTime = '';
    this.huntPotionsUsed = '';
    this.huntArrowsUsed = '';
    this.huntRunesUsed = '';
    this.huntSpiritsUsed = '';
    this.resultText = '';
  }
}
