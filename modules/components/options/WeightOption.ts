import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';
import {WeightConverter, WeightUnit, WeightConversion} from '../../conversion';
import numeral from 'numeral';

export default class WeightOption extends FromOption {
  doConversion(configuration: ConversionConfiguration): Array<ConversionResult> {
    const value = numeral(configuration.value).value();
    if (configuration.unit === 'lb') {
      const converter = new WeightConverter(WeightUnit.lb, value);
      return [this.getConversionResult(converter.convertTo(WeightUnit.kg))];
    } else if (configuration.unit === 'kg') {
      const converter = new WeightConverter(WeightUnit.kg, value);
      return [this.getConversionResult(converter.convertTo(WeightUnit.lb))];
    }
    return [];
  }

  private getConversionResult = (conversion: WeightConversion): ConversionResult => {
    const unit = conversion.toUnit === WeightUnit.kg ? 'kg' : 'lb';
    return new ConversionResult(conversion.toWeight, unit);
  };
}
