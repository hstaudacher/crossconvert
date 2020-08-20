import {FromOption} from './FromOptions';

export default class ConversionConfiguration {
  constructor(readonly unit: string, readonly value: string, readonly from: FromOption) {}

  copyWithUnit(unit: string): ConversionConfiguration {
    return new ConversionConfiguration(unit, this.value, this.from);
  }

  copyWithValue(value: string): ConversionConfiguration {
    return new ConversionConfiguration(this.unit, value, this.from);
  }

  copyWithFrom(from: FromOption): ConversionConfiguration {
    return new ConversionConfiguration(this.unit, this.value, from);
  }
}
