import { Component, OnInit } from '@angular/core';
import { Hunt } from '../model/hunt';

@Component({
  selector: 'app-hunt-planner',
  templateUrl: './hunt-planner.component.html',
  styleUrls: ['./hunt-planner.component.css']
})
export class HuntPlannerComponent implements OnInit {

  huntsList: Hunt[] = [];

  huntHistoryTime: string;
  huntPotionsUsed: string;
  huntArrowsUsed: string;
  huntRunesUsed: string;
  huntName: string;

  plannerMinutes: string;
  plannerCapacity: string;

  resultText: string;

  MANA_POTION_CAP = 3.1;
  DIAMOND_ARROW_CAP = 0.8;
  AVALANCHE_CAP = 0.52;

  constructor() { }

  ngOnInit(): void {
    this.loadSavedHunts();
  }

  gerarResultado() {
    const manaPerMinute = Number.parseInt(this.huntPotionsUsed) / Number.parseInt(this.huntHistoryTime);
    const arrowPerMinute = Number.parseInt(this.huntArrowsUsed) / Number.parseInt(this.huntHistoryTime);
    const runesPerMinute = Number.parseInt(this.huntRunesUsed) / Number.parseInt(this.huntHistoryTime);

    let resultMana = 0;
    let resultBolt = 0;
    let resultRunes = 0;

    if (this.isTimeDefined() && this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerCapacityAux > 0 && plannerTimeAux > 0) {
        plannerTimeAux--;
        plannerCapacityAux -= (manaPerMinute * this.MANA_POTION_CAP) + (arrowPerMinute * this.DIAMOND_ARROW_CAP) + (runesPerMinute * this.AVALANCHE_CAP);

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
      }
    } else if (this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);

      while (plannerCapacityAux > 0) {
        plannerCapacityAux -= (manaPerMinute * this.MANA_POTION_CAP) + (arrowPerMinute * this.DIAMOND_ARROW_CAP) + (runesPerMinute * this.AVALANCHE_CAP);

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
      }
    } else {
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerTimeAux > 0) {
        plannerTimeAux--;

        resultMana += manaPerMinute;
        resultBolt += arrowPerMinute;
        resultRunes += runesPerMinute;
      }
    }

    this.resultText = `Você vai precisar de ${Math.floor(resultMana)} mana potions, ${Math.floor(resultBolt)} bolts e ${Math.floor(resultRunes)} runas de sua escolha`;
  }

  isTimeDefined() {
    return Number.parseInt(this.plannerMinutes) > 0;
  }

  isCapDefined() {
    return Number.parseInt(this.plannerCapacity) > 0;
  }

  saveHunt() {
    const hunt = Hunt.create(this.huntName, this.huntHistoryTime, this.huntPotionsUsed, this.huntArrowsUsed, this.huntRunesUsed);

    if (this.isValid(hunt)) {
      const huntLookup = this.huntsList.filter(savedHunt => savedHunt.name === hunt.name).pop();

      if (huntLookup) {
        huntLookup.historyMinutes = hunt.historyMinutes;
        huntLookup.historyPotions = hunt.historyPotions;
        huntLookup.historyArrows = hunt.historyArrows;
        huntLookup.historyRunes = hunt.historyRunes;
      } else {
        this.huntsList.push(hunt);
      }

      localStorage.removeItem('huntPlanner');
      localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
    }
  }

  load() {
    return JSON.parse(localStorage.getItem('huntPlanner'));
  }

  mergeHunt(huntName: string) {
    if (this.huntName === huntName) {
      const hunt = this.huntsList.filter(hunt => hunt.name === huntName).pop();

      hunt.historyMinutes = hunt.historyMinutes + Number.parseInt(this.huntHistoryTime);
      hunt.historyPotions = hunt.historyPotions + Number.parseInt(this.huntPotionsUsed);
      hunt.historyArrows = hunt.historyArrows + Number.parseInt(this.huntArrowsUsed);
      hunt.historyRunes = hunt.historyRunes + Number.parseInt(this.huntRunesUsed);

      this.huntHistoryTime = hunt.historyMinutes.toString();
      this.huntPotionsUsed = hunt.historyPotions.toString();
      this.huntArrowsUsed = hunt.historyArrows.toString();
      this.huntRunesUsed = hunt.historyRunes.toString();

      localStorage.removeItem('huntPlanner');
      localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
    } else {
      console.error("o nome da hunt é diferente - carregue uma hunt antes de mergea-la")
    }
  }

  deleteHunt(huntName: string) {
    this.huntsList = this.huntsList.filter(hunt => hunt.name !== huntName);
    localStorage.removeItem('huntPlanner');
    localStorage.setItem('huntPlanner', JSON.stringify(this.huntsList));
  }

  loadSavedHunts() {
    const loaded = this.load();

    if (loaded) {
      loaded.forEach(obj => {
        if (this.isValid(obj)) {
          this.huntsList.push(Hunt.createFromJSON(obj));
        }
      });
    }
  }

  isValid(obj) {
    return obj.name && obj.name !== "";
  }

  loadHunt(hunt: Hunt) {
    this.huntHistoryTime = hunt.historyMinutes.toString();
    this.huntPotionsUsed = hunt.historyPotions.toString();
    this.huntArrowsUsed = hunt.historyArrows.toString();
    this.huntRunesUsed = hunt.historyRunes.toString();
    this.huntName = hunt.name;
  }
}
