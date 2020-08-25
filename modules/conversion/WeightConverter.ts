import WeightUnit from './WeightUnit';
import WeightConversion from './WeightConversion';

import {convert} from 'convert';

export default class WeightConverter {
  constructor(private readonly unit: WeightUnit, private readonly weight: number) {}

  convertTo(toUnit: WeightUnit): WeightConversion {
    const convertedWeight: number = convert(this.weight).from(this.unit).to(toUnit);
    return new WeightConversion(this.unit, this.weight, toUnit, convertedWeight);
  }
}
