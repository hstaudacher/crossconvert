import WeightUnit from './WeightUnit';
import WeightConversion from './WeightConversion';

export default class WeightConverter {
  constructor(private readonly unit: WeightUnit, private readonly weight: number) {}

  convertTo(toUnit: WeightUnit): WeightConversion {
    var convertedWeight: number = this.weight;
    if (this.unit === WeightUnit.kg && toUnit === WeightUnit.lbs) {
      convertedWeight = Math.round(this.weight * 2.205);
    } else if (this.unit === WeightUnit.lbs && toUnit === WeightUnit.kg) {
      convertedWeight = Math.round(this.weight / 2.205);
    }
    return new WeightConversion(this.unit, this.weight, toUnit, convertedWeight);
  }
}
