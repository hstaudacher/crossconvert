import ConversionConfiguration from '../ConversionConfiguration';
import {WeightConverter, WeightUnit, WeightConversion} from '../../conversion';
import numeral from 'numeral';

class WeightPercentage {
  constructor(readonly percentage: number, readonly conversion: WeightConversion) {}
}

class WeightPercentager {
  constructor(readonly configuration: ConversionConfiguration) {}

  public getPercentages = (percentagesToCalculate: number[]): WeightPercentage[] => {
    return percentagesToCalculate.map((p) => this.calculatePercentage(p));
  };

  private calculatePercentage = (percentage: number): WeightPercentage => {
    const value = numeral(this.configuration.value).value();
    const fromWeight = (value / 100) * percentage;
    const fromUnit = this.configuration.unit === 'kg' ? WeightUnit.kg : WeightUnit.lb;
    const toUnit = fromUnit === WeightUnit.kg ? WeightUnit.lb : WeightUnit.kg;
    const converter = new WeightConverter(fromUnit, fromWeight);
    const conversion = converter.convertTo(toUnit);
    return new WeightPercentage(percentage, this.formatConversion(conversion));
  };

  private formatConversion = (conversion: WeightConversion): WeightConversion => {
    return new WeightConversion(
      conversion.fromUnit,
      Math.round(conversion.fromWeight),
      conversion.toUnit,
      Math.round(conversion.toWeight),
    );
  };
}

export {WeightPercentager, WeightPercentage};
