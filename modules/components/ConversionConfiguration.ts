import {FromOption} from './FromOptions';

export default class ConversionConfiguration {
  constructor(public unit: string, public value: string, public from: FromOption) {}

  copy(): ConversionConfiguration {
    return new ConversionConfiguration(this.unit, this.value, this.from);
  }
}
