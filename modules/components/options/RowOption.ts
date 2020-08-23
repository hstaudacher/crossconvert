import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';

export default class RowOption extends FromOption {
  constructor() {
    super('Row', 'rowing', 'material', 'tomato');
  }

  convert(configuration: ConversionConfiguration): Array<ConversionResult> {
    console.log(configuration);
    return [new ConversionResult(200, 'm'), new ConversionResult(15, 'cal')];
  }
}
