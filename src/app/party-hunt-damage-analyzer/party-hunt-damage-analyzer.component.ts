import { Component } from '@angular/core';

@Component({
  selector: 'app-party-hunt-damage-analyzer',
  templateUrl: './party-hunt-damage-analyzer.component.html',
  styleUrls: ['./party-hunt-damage-analyzer.component.css']
})
export class PartyHuntDamageAnalyzerComponent {

  partyAnalyzer: string;
  damageResult: string = '';
  lootResult: string = '';


  analyze() {
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
        Name: key,
        Loot: Number.parseInt(loot.replace(',', '')),
        Supplies: supplies,
        Balance: balance,
        Damage: Number.parseInt(damage.replace(',', '')),
        Healing: healing,
      });
    }

    objects.sort(this.sortDamageAscending)
    //https://www.tibia.com/community/?name=setsuni
    objects.forEach(obj => {
      this.damageResult += `<a href='https://www.tibia.com/community/?name=${obj.Name}'>${obj.Name}<a/> bateu ${obj.Damage}<br>`;
    })

    objects.sort(this.sortLootDescending)
    objects.forEach(obj => {
      this.lootResult += `<a href='https://www.tibia.com/community/?name=${obj.Name}'>${obj.Name}<a/> looteou ${obj.Loot}<br>`;
    })
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
}
