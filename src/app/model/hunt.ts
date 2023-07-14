export class Hunt {
  name: string;
  historyMinutes: number;
  historyPotions: number;
  historyArrows: number;
  historyRunes: number;

  static createFromJSON(jsonObject): Hunt {
    let hunt = new Hunt();
    hunt.name = jsonObject.name;
    hunt.historyMinutes = jsonObject.historyMinutes;
    hunt.historyPotions = jsonObject.historyPotions;
    hunt.historyArrows = jsonObject.historyArrows;
    hunt.historyRunes = jsonObject.historyRunes;
    return hunt;
  }

  static create(name, minutes, potions, bolts, runes) {
    const hunt = new Hunt();
    hunt.name = name;
    hunt.historyMinutes = Number.parseInt(minutes);
    hunt.historyPotions = Number.parseInt(potions);
    hunt.historyArrows = Number.parseInt(bolts);
    hunt.historyRunes = Number.parseInt(runes);
    return hunt;
  }
}
