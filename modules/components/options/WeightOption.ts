import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class WeightOption extends FromOption {
  constructor() {
    super('Weight', 'barbell-outline', 'ionicon', 'green');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [];
  }
}
