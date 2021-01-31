import {WeightUnit} from '../../conversion';
import {Plate, plateMappings} from '../settings/Plates';

class PlateGroup {
  constructor(readonly plate: Plate, readonly amount: number) {}
}

class PlateDistribution {
  constructor(readonly plates: number[], readonly unit: WeightUnit) {}

  public getPlateGroups = (): PlateGroup[] => {
    const plateGroups: PlateGroup[] = [];
    plateMappings.forEach((mapping) => {
      const amount = this.plates.filter((p) => {
        const weight = this.unit === WeightUnit.kg ? mapping.kg : mapping.lbs;
        return p === weight;
      }).length;
      if (amount > 0) {
        plateGroups.push(new PlateGroup(mapping.plate, amount));
      }
    });
    return plateGroups;
  };
}

class PlateDistributor {
  constructor(readonly barWeight: number, readonly unit: WeightUnit) {}

  public getPlateDistribution = (weight: number): PlateDistribution => {
    const availablePlates = this.getAvailablePlates();
    const plates: number[] = [];
    let weightToDistribute = weight - this.barWeight;
    let plate = availablePlates.shift();
    while (availablePlates.length >= 0 && weightToDistribute > 0) {
      if (plate !== undefined && weightToDistribute >= plate * 2) {
        plates.push(plate);
        plates.push(plate);
        weightToDistribute = weightToDistribute - 2 * plate;
      } else {
        plate = availablePlates.shift();
      }
    }
    return new PlateDistribution(plates, this.unit);
  };

  private getAvailablePlates = (): number[] => {
    if (this.unit === WeightUnit.kg) {
      return plateMappings.map((m) => m.kg).sort((a, b) => b - a);
    }
    return plateMappings.map((m) => m.lbs).sort((a, b) => b - a);
  };
}

export {PlateDistributor, PlateDistribution, PlateGroup};
