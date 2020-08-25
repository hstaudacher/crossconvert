import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';
import {ExerciseConverter, Exercise, Unit, ExerciseConversion} from '../../conversion';

export default class ExerciseOption extends FromOption {
  constructor(
    readonly title: string,
    readonly icon: string,
    readonly type: string,
    readonly color: string,
    readonly exercise: Exercise,
  ) {
    super(title, icon, type, color);
  }

  doConversion(configuration: ConversionConfiguration): Array<ConversionResult> {
    if (configuration.from instanceof ExerciseOption) {
      const fromExercise = configuration.from as ExerciseOption;
      if (configuration.unit === 'cal' || configuration.unit === 'm') {
        const converter = this.createConverter(configuration, fromExercise);
        return this.doConvert(converter);
      }
    }
    return [];
  }

  private createConverter = (
    configuration: ConversionConfiguration,
    fromExercise: ExerciseOption,
  ): ExerciseConverter => {
    const unit: Unit = this.getUnit(configuration.unit);
    const value: number = +configuration.value;
    return new ExerciseConverter(fromExercise.exercise, unit, value);
  };

  private getUnit = (unit: string): Unit => {
    if (unit === 'cal') {
      return Unit.Calories;
    }
    return Unit.Meter;
  };

  private getConversionResult = (conversion: ExerciseConversion): ConversionResult => {
    const unit = conversion.unit === Unit.Calories ? 'cal' : 'm';
    return new ConversionResult(conversion.value, unit);
  };

  private doConvert = (converter: ExerciseConverter): Array<ConversionResult> => {
    const units = converter.getSupportedUnits(this.exercise);
    const conversions = [];
    for (let u of units) {
      const conversion = converter.convertTo(this.exercise, u);
      conversions.push(this.getConversionResult(conversion));
    }
    return conversions;
  };
}
