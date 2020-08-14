import DistanceUnit from './DistanceUnit';
import DistanceConversion from './DistanceConversion';

import {convert} from 'convert';

export default class DistanceConverter {
  constructor(private readonly unit: DistanceUnit, private readonly distance: number) {}

  convertTo(toUnit: DistanceUnit): DistanceConversion {
    const convertedDistance: number = convert(this.distance).from(this.unit).to(toUnit);
    return new DistanceConversion(this.unit, this.distance, toUnit, Math.round(convertedDistance));
  }
}
