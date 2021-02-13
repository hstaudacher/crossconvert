import ConversionConfiguration from '../ConversionConfiguration';
import numeral from 'numeral';
import * as RNLocalize from 'react-native-localize';

export abstract class FromOption {
  constructor(
    readonly title: string,
    readonly icon: string,
    readonly type: string,
    readonly color: string,
    readonly selectionIconSize: number,
    readonly resultIconSize: number,
  ) {}

  private formatNumber = (value: number, unit: string): string => {
    if (value < 1 && value > 0 && unit !== 'cal') {
      return numeral(value).format('0,0.00');
    } else if (unit === 'cal' || unit === 'lb' || unit === 'kg') {
      return numeral(value).format();
    } else if (unit === 'm') {
      return numeral(this.roundToNearestTen(value)).format();
    }
    return numeral(value).format('0,0');
  };

  private format = (value: number, unit: string): string => {
    let formatedNumber = this.formatNumber(value, unit);
    const decimalSeparator = RNLocalize.getNumberFormatSettings().decimalSeparator;
    const groupingSeparator = RNLocalize.getNumberFormatSettings().groupingSeparator;
    if (decimalSeparator === ',') {
      formatedNumber = formatedNumber.replace('.', 'XXX');
    }
    if (groupingSeparator === '.') {
      formatedNumber = formatedNumber.replace(',', groupingSeparator);
    }
    return formatedNumber.replace('XXX', decimalSeparator);
  };

  private roundToNearestTen = (value: number): number => {
    return Math.round(value / 10) * 10;
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
