import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class RunOption extends FromOption {
  constructor() {
    super('Run', 'running', 'font-awesome-5', 'blue');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [];
  }
}
