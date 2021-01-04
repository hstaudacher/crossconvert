import {WeightUnit} from '../../conversion';

enum Plate {
  BIG_BLUE,
  BIG_YELLOW,
  BIG_GREEN,
}

class PlateDistribution {
  constructor(readonly plates: Plate[], readonly unit: WeightUnit) {}
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
    return [55, 45, 35, 25, 1, 0.75, 0.5, 0.25];
  };
}

export {PlateDistributor, PlateDistribution, Plate};
