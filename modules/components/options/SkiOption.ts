import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class SkiOption extends FromOption {
  constructor() {
    super('Ski', 'skiing-nordic', 'font-awesome-5', 'lightblue');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [new ConversionResult(500, 'm')];
  }
}
