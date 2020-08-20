import {ConvertUiItem} from './ConvertUiItems';

export default class ConversionContext {
  constructor(readonly unit: string, readonly value: string, readonly from: ConvertUiItem) {}

  copyWithUnit(unit: string): ConversionContext {
    return new ConversionContext(unit, this.value, this.from);
  }

  copyWithValue(value: string): ConversionContext {
    return new ConversionContext(this.unit, value, this.from);
  }

  copyWithFrom(from: ConvertUiItem): ConversionContext {
    return new ConversionContext(this.unit, this.value, from);
  }
}
