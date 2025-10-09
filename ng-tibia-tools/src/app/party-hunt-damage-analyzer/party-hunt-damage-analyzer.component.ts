import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

const DMG_CUTOFF = 0.6
const HEALING_CUTOFF = 0.5

export class Character {
  name;
  damage;
  vocation;
  level;
  healing;
  vocationEnumFodasse = {
    'Master Sorcerer': "MS",
    'Sorcerer': "MS",
    'Elder Druid': "ED",
    'Druid': "ED",
    'Royal Paladin': "RP",
    'Paladin': "RP",
    'Elite Knight': "EK",
    'Knight': "EK",
  }

  constructor(name, damage, vocation, level, healing) {
    this.name = name;
    this.damage = damage;
    this.vocation = vocation;
    this.level = level;
    this.healing = healing;
  }

  translateVocation() {
    return this.vocationEnumFodasse[this.vocation];
  }

  calculateDPL() {
    return Math.floor(this.damage / this.level);
  }

  isBelowAverage(dmgAverage) {
    if (['EK'].includes(this.translateVocation())) return false;
    return this.calculateDPL() < (dmgAverage * DMG_CUTOFF);
  }
}

@Component({
  selector: 'app-party-hunt-damage-analyzer',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './party-hunt-damage-analyzer.component.html',
  styleUrls: ['./party-hunt-damage-analyzer.component.css']
})
export class PartyHuntDamageAnalyzerComponent {
  @ViewChildren('specificElement') specificElements: QueryList<ElementRef>;
  @ViewChild('captureThis', { static: true }) captureElementRef: ElementRef;

  partyAnalyzer: string;
  damageResult: string = '';
  lootResult: string = '';

  finalCharactersArray = [];
  finalDplAverage = 0;
  finalHealingAverage = 0;

  constructor(private http: HttpClient) {

  }

  analyze() {
    this.finalCharactersArray = [];
    this.damageResult = '';
    this.finalDplAverage = 0;
    this.finalHealingAverage = 0;

    const lines = this.partyAnalyzer.split('\n').slice(6); // Discard the first six lines
    const objects = [];

    for (let i = 0; i < lines.length; i += 6) {
      const key = lines[i].trim();
      const loot = lines[i + 1].split(':')[1].trim();
      const supplies = lines[i + 2].split(':')[1].trim();
      const balance = lines[i + 3].split(':')[1].trim();
      const damage = lines[i + 4].split(':')[1].trim();
      const healing = lines[i + 5].split(':')[1].trim();

      objects.push({
        Name: key.replace(" (Leader)", ""),
        Loot: Number.parseInt(loot.replace(',', '')),
        Supplies: supplies,
        Balance: balance,
        Damage: Number.parseInt(damage.replace(',', '')),
        Healing: Number.parseInt(healing.replace(',', '')),
      });
    }

    objects.sort(this.sortDamageAscending);

    this.fetchDataForObjects(objects).subscribe({
      next: (response) => {

        response.forEach(character => {
          const fetchedCharacterName = character.characters.character.name;
          const fetchedCharacterVocation = character.characters.character.vocation;
          const fetchedCharacterLevel = character.characters.character.level;

          const res = objects.find(obj => obj.Name === fetchedCharacterName);

          this.finalCharactersArray.push(new Character(fetchedCharacterName, res.Damage, fetchedCharacterVocation, fetchedCharacterLevel, res.Healing));
        });

        this.calculateShootersAverageDamage();

        setTimeout(() => {
          this.captureAndCopy();
        }, 100);
      }
    });


    /*
    objects.sort(this.sortDamageAscending)
    objects.forEach(obj => {
      this.damageResult += `<a href='https://www.tibia.com/community/?name=${obj.Name}'>${obj.Name}<a/> bateu ${obj.Damage}<br>`;
    })

    objects.sort(this.sortLootDescending)
    objects.forEach(obj => {
      this.lootResult += `<a href='https://www.tibia.com/community/?name=${obj.Name}'>${obj.Name}<a/> looteou ${obj.Loot}<br>`;
    })
    */
  }

  calculateShootersAverageDamage() {
    this.finalCharactersArray.forEach(character => {
      this.finalDplAverage += character.calculateDPL();
    });
    this.finalDplAverage = Math.floor(this.finalDplAverage / this.finalCharactersArray.length);
  }

  captureAndCopy() {
    const element = this.captureElementRef.nativeElement;
  }

  sortDamageAscending(a, b) {
    if (a.Damage < b.Damage) {
      return -1;
    }
    if (a.Damage > b.Damage) {
      return 1;
    }
    return 0;
  }


  sortLootDescending(a, b) {
    if (a.Loot < b.Loot) {
      return 1;
    }
    if (a.Loot > b.Loot) {
      return -1;
    }
    return 0;
  }

  fetchDataForObjects(objects: any[]): Observable<any[]> {
    // Create an array to store individual HTTP requests
    const httpRequests: Observable<any>[] = [];

    // Loop through the array of objects and create an HTTP request for each object
    for (const obj of objects) {
      // Replace 'yourApiEndpoint' with your actual API endpoint URL for each object
      const apiUrl = `https://api.tibiadata.com/v3/character/${obj.Name}`;

      // Push the HTTP request Observable to the array
      httpRequests.push(this.http.get(apiUrl));
    }

    // Use forkJoin to wait for all the HTTP requests to complete
    // and combine their results into a single Observable
    return forkJoin(httpRequests);
  }
}
