import ConversionConfiguration from '../ConversionConfiguration';
import numeral from 'numeral';

export abstract class FromOption {
  constructor(readonly title: string, readonly icon: string, readonly type: string, readonly color: string) {}

  private format = (value: number, unit: string): string => {
    console.log(unit);
    if (value < 1 && value > 0 && unit !== 'cal') {
      return numeral(value).format('0,0.00');
    } else if (unit === 'cal' || unit === 'lbs' || unit === 'kg') {
      return numeral(value).format();
    }
    return numeral(value).format('0,0');
  };

  convert = (configuration: ConversionConfiguration): Array<ConversionResult> => {
    const results = this.doConversion(configuration);
    return results.map((r) => new ConversionResult(this.format(r.value as number, r.unit), r.unit));
  };

  protected abstract doConversion(configuration: ConversionConfiguration): Array<ConversionResult>;
}

export class ConversionResult {
  constructor(readonly value: string | number, readonly unit: string) {}
}
