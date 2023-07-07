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
  huntBoltsUsed: string;
  huntRunesUsed: string;
  huntName: string;

  plannerMinutes: string;
  plannerCapacity: string;

  resultText: string;

  potionCap = 3.1;
  boltCap = 0.85;
  runeCap = 0;

  constructor() { }

  ngOnInit(): void {
    this.loadSavedHunts();
  }

  gerarResultado() {
    const manaPerMinute = Math.floor(Number.parseInt(this.huntPotionsUsed) / Number.parseInt(this.huntHistoryTime));
    const boltPerMinute = Math.floor(Number.parseInt(this.huntBoltsUsed) / Number.parseInt(this.huntHistoryTime));
    const runesPerMinute = Math.floor(Number.parseInt(this.huntRunesUsed) / Number.parseInt(this.huntHistoryTime));

    let resultMana = 0;
    let resultBolt = 0;
    let resultRunes = 0;

    if (this.isTimeDefined() && this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerCapacityAux > 0 && plannerTimeAux > 0) {
        plannerTimeAux--;
        plannerCapacityAux -= (manaPerMinute * this.potionCap) + (boltPerMinute * this.boltCap) + (runesPerMinute * this.runeCap);

        resultMana += manaPerMinute;
        resultBolt += boltPerMinute;
        resultRunes += runesPerMinute;
      }
    } else if (this.isCapDefined()) {
      let plannerCapacityAux = Number.parseInt(this.plannerCapacity);

      while (plannerCapacityAux > 0) {
        plannerCapacityAux -= (manaPerMinute * this.potionCap) + (boltPerMinute * this.boltCap) + (runesPerMinute * this.runeCap);

        resultMana += manaPerMinute;
        resultBolt += boltPerMinute;
        resultRunes += runesPerMinute;
      }
    } else {
      let plannerTimeAux = Number.parseInt(this.plannerMinutes);

      while (plannerTimeAux > 0) {
        plannerTimeAux--;

        resultMana += manaPerMinute;
        resultBolt += boltPerMinute;
        resultRunes += runesPerMinute;
      }
    }

    this.resultText = `Você vai precisar de ${resultMana} mana potions, ${resultBolt} bolts e ${resultRunes} runas de sua escolha`;
  }

  isTimeDefined() {
    return Number.parseInt(this.plannerMinutes) > 0;
  }

  isCapDefined() {
    return Number.parseInt(this.plannerCapacity) > 0;
  }

  saveHunt() {
    const hunt = Hunt.create(this.huntName, this.huntHistoryTime, this.huntPotionsUsed, this.huntBoltsUsed, this.huntRunesUsed);

    if (this.isValid(hunt)) {
      const huntLookup = this.huntsList.filter(savedHunt => savedHunt.name === hunt.name).pop();

      if (huntLookup) {
        huntLookup.historyMinutes = hunt.historyMinutes;
        huntLookup.historyPotions = hunt.historyPotions;
        huntLookup.historyBolts = hunt.historyBolts;
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
      hunt.historyBolts = hunt.historyBolts + Number.parseInt(this.huntBoltsUsed);
      hunt.historyRunes = hunt.historyRunes + Number.parseInt(this.huntRunesUsed);

      this.huntHistoryTime = hunt.historyMinutes.toString();
      this.huntPotionsUsed = hunt.historyPotions.toString();
      this.huntBoltsUsed = hunt.historyBolts.toString();
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
    this.huntBoltsUsed = hunt.historyBolts.toString();
    this.huntRunesUsed = hunt.historyRunes.toString();
    this.huntName = hunt.name;
  }
}
