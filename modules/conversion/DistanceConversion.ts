import DistanceUnit from './DistanceUnit';

export default class DistanceConversion {
  constructor(
    readonly fromUnit: DistanceUnit,
    readonly fromDistance: number,
    readonly toUnit: DistanceUnit,
    readonly toDistance: number,
  ) {}
}
