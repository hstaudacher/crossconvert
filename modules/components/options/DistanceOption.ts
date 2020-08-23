import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class DistanceOption extends FromOption {
  constructor() {
    super('Distance', 'ruler', 'font-awesome-5', 'firebrick');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [];
  }
}
