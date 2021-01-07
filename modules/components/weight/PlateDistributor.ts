import {WeightUnit} from '../../conversion';

enum Plate {
  RED,
  BLUE,
  YELLOW,
  GREEN,
  WHITE,
  FRACTIONAL_RED,
  FRACTIONAL_GREEN,
  FRACTIONAL_YELLOW,
  FRACTIONAL_BLUE,
  FRACTIONAL_WHITE,
}

class PlateGroup {
  constructor(readonly plate: Plate, readonly amount: number) {}
}

class PlateMapping {
  constructor(readonly weight: number, readonly plate: Plate) {}
}

class PlateDistribution {
  constructor(readonly plates: number[], readonly unit: WeightUnit) {}

  public getPlateGroups = (): PlateGroup[] => {
    const plateGroups: PlateGroup[] = [];
    const plateMapping = this.getPlateMapping();
    plateMapping.forEach((mapping) => {
      const amount = this.plates.filter((p) => {
        return p === mapping.weight;
      }).length;
      if (amount > 0) {
        plateGroups.push(new PlateGroup(mapping.plate, amount));
      }
    });
    return plateGroups;
  };

  private getPlateMapping = (): PlateMapping[] => {
    if (this.unit === WeightUnit.kg) {
      return this.getKgPlateMapping();
    }
    return this.getLbsPlateMapping();
  };

  private getKgPlateMapping = (): PlateMapping[] => {
    return [
      new PlateMapping(25, Plate.RED),
      new PlateMapping(20, Plate.BLUE),
      new PlateMapping(15, Plate.YELLOW),
      new PlateMapping(10, Plate.GREEN),
      new PlateMapping(5, Plate.WHITE),
      new PlateMapping(2.5, Plate.FRACTIONAL_RED),
      new PlateMapping(2, Plate.FRACTIONAL_BLUE),
      new PlateMapping(1.5, Plate.FRACTIONAL_YELLOW),
      new PlateMapping(1, Plate.FRACTIONAL_GREEN),
      new PlateMapping(0.5, Plate.FRACTIONAL_WHITE),
    ];
  };

  private getLbsPlateMapping = (): PlateMapping[] => {
    return [
      new PlateMapping(55, Plate.RED),
      new PlateMapping(45, Plate.BLUE),
      new PlateMapping(35, Plate.YELLOW),
      new PlateMapping(25, Plate.GREEN),
      new PlateMapping(10, Plate.WHITE),
      new PlateMapping(5, Plate.FRACTIONAL_BLUE),
      new PlateMapping(2.5, Plate.FRACTIONAL_GREEN),
      new PlateMapping(1, Plate.FRACTIONAL_RED),
      new PlateMapping(0.5, Plate.FRACTIONAL_YELLOW),
    ];
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
      return [25, 20, 15, 10, 5, 2, 1, 0.5];
    }
    return [55, 45, 35, 25, 10, 5, 2.5, 1, 0.5];
  };
}

export {PlateDistributor, PlateDistribution, Plate, PlateGroup};
