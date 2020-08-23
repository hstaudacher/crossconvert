import ConversionConfiguration from '../ConversionConfiguration';

export abstract class FromOption {
  constructor(readonly title: string, readonly icon: string, readonly type: string, readonly color: string) {}

  abstract convert(configuration: ConversionConfiguration): Array<ConversionResult>;
}

export class ConversionResult {
  constructor(readonly value: number, readonly unit: string) {}
}
