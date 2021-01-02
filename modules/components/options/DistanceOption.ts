import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';
import {DistanceConversion, DistanceUnit, DistanceConverter} from '../../conversion';
import numeral from 'numeral';

export default class DistanceOption extends FromOption {
  doConversion(configuration: ConversionConfiguration): Array<ConversionResult> {
    const value = numeral(configuration.value).value();
    if (configuration.unit === 'm') {
      return this.convertMeters(value);
    } else if (configuration.unit === 'mi') {
      const converter = new DistanceConverter(DistanceUnit.mi, value);
      return [this.getConversionResult(converter.convertTo(DistanceUnit.m))];
    } else if (configuration.unit === 'in') {
      const converter = new DistanceConverter(DistanceUnit.in, value);
      return [this.getConversionResult(converter.convertTo(DistanceUnit.cm))];
    } else if (configuration.unit === 'ft') {
      const converter = new DistanceConverter(DistanceUnit.ft, value);
      return [this.getConversionResult(converter.convertTo(DistanceUnit.m))];
    }
    return [];
  }

  private convertMeters = (value: number): Array<ConversionResult> => {
    const converter = new DistanceConverter(DistanceUnit.m, value);
    const results = [];
    if (value <= 100 && value > 0) {
      results.push(this.getConversionResult(converter.convertTo(DistanceUnit.ft)));
    }
    results.push(this.getConversionResult(converter.convertTo(DistanceUnit.mi)));
    return results;
  };

  private getConversionResult = (conversion: DistanceConversion): ConversionResult => {
    switch (conversion.toUnit) {
      case DistanceUnit.in:
        return new ConversionResult(conversion.toDistance, 'in');
      case DistanceUnit.cm:
        return new ConversionResult(conversion.toDistance, 'cm');
      case DistanceUnit.ft:
        return new ConversionResult(conversion.toDistance, 'ft');
      case DistanceUnit.km:
        return new ConversionResult(conversion.toDistance, 'km');
      case DistanceUnit.m:
        return new ConversionResult(conversion.toDistance, 'm');
      case DistanceUnit.mi:
        return new ConversionResult(conversion.toDistance, 'mi');
    }
    throw new Error('can not convert distance unit ' + conversion.toUnit);
  };
}
