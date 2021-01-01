import ConversionConfiguration from '../ConversionConfiguration';
import {WeightConverter, WeightUnit, WeightConversion} from '../../conversion';
import numeral from 'numeral';

class WeightPercentage {
  constructor(readonly percentage: number, readonly conversion: WeightConversion) {}
}

class WeightPercentager {
  constructor(readonly configuration: ConversionConfiguration) {}

  public getPercentages = (): WeightPercentage[] => {
    const percentages: WeightPercentage[] = [];
    for (var percentage: number = 100; percentage >= 50; percentage -= 5) {
      percentages.push(this.calculatePercentage(percentage));
    }
    return percentages;
  };

  private calculatePercentage = (percentage: number): WeightPercentage => {
    const value: number = numeral(this.configuration.value).value();
    const fromWeight: number = (value / 100) * percentage;
    const fromUnit: WeightUnit = this.configuration.unit === 'kg' ? WeightUnit.kg : WeightUnit.lbs;
    const toUnit = fromUnit === WeightUnit.kg ? WeightUnit.lbs : WeightUnit.kg;
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
