import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class BikeOption extends FromOption {
  constructor() {
    super('Bike', 'biking', 'font-awesome-5', 'orange');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [];
  }
}
