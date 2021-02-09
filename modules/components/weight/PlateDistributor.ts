import {WeightUnit} from '../../conversion';
import {PlateMapping, plateMappings} from '../settings/Plates';
import {WeightSettings} from '../settings/WeightSettings';

class PlateGroup {
  constructor(readonly mapping: PlateMapping, readonly amount: number) {}
}

class PlateDistribution {
  constructor(readonly plates: number[], readonly unit: WeightUnit, readonly completelyDistributed = true) {}

  public getPlateGroups = (): PlateGroup[] => {
    const plateGroups: PlateGroup[] = [];
    plateMappings().forEach((mapping) => {
      const amount = this.plates.filter((p) => {
        const weight = this.unit === WeightUnit.kg ? mapping.kg : mapping.lbs;
        return p === weight;
      }).length;
      if (amount > 0) {
        plateGroups.push(new PlateGroup(mapping, amount));
      }
    });
    return plateGroups;
  };
}

class PlateDistributor {
  constructor(readonly weightSettings: WeightSettings, readonly unit: WeightUnit) {}

  public getPlateDistribution = (weight: number): PlateDistribution => {
    const availablePlates = this.getAvailablePlates();
    const plates: number[] = [];
    let weightToDistribute = weight - this.getBarWeight();
    let plate = availablePlates.shift();
    while (plate !== undefined && availablePlates.length >= 0 && weightToDistribute > 0) {
      if (weightToDistribute >= plate * 2) {
        plates.push(plate);
        plates.push(plate);
        weightToDistribute = weightToDistribute - 2 * plate;
      }
      plate = availablePlates.shift();
    }
    if (weightToDistribute > 0) {
      return new PlateDistribution(plates, this.unit, false);
    }
    return new PlateDistribution(plates, this.unit);
  };

  private getAvailablePlates(): number[] {
    const plates: number[] = [];
    this.weightSettings.availablePlates.map((a) => {
      for (let i = 0; i < a.availability / 2; i++) {
        if (this.unit === WeightUnit.kg) {
          plates.push(a.mapping.kg);
        } else {
          plates.push(a.mapping.lbs);
        }
      }
    });
    return plates.sort((a, b) => b - a);
  }

  private getBarWeight() {
    if (this.unit === WeightUnit.kg) {
      return this.weightSettings.bar.kg;
    }
    return this.weightSettings.bar.lbs;
  }
}

export {PlateDistributor, PlateDistribution, PlateGroup};
