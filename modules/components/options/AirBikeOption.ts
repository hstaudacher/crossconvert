import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class AirBikeOption extends FromOption {
  constructor() {
    super('Air Bike', 'skull-crossbones', 'font-awesome-5', 'purple');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [];
  }
}
