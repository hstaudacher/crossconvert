import {FromOption, ConversionResult} from './FromOption';
import ConversionConfiguration from '../ConversionConfiguration';
import {ExerciseConverter, Exercise, Unit, ExerciseConversion, DistanceConverter, DistanceUnit} from '../../conversion';
import numeral from 'numeral';

export default class ExerciseOption extends FromOption {
  constructor(
    readonly title: string,
    readonly icon: string,
    readonly type: string,
    readonly color: string,
    readonly selectIconSize: number,
    readonly exercise: Exercise,
  ) {
    super(title, icon, type, color, selectIconSize);
  }

  doConversion(configuration: ConversionConfiguration): Array<ConversionResult> {
    if (configuration.from instanceof ExerciseOption) {
      const fromExercise = configuration.from as ExerciseOption;
      if (configuration.unit === 'cal' || configuration.unit === 'm' || configuration.unit === 'mi') {
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
    const unit = this.getUnit(configuration.unit);
    const value = this.computeValue(configuration);
    return new ExerciseConverter(fromExercise.exercise, unit, value);
  };

  private computeValue = (configuration: ConversionConfiguration): number => {
    if (configuration.unit === 'mi') {
      const converter = new DistanceConverter(DistanceUnit.mi, numeral(configuration.value).value());
      return converter.convertTo(DistanceUnit.m).toDistance;
    }
    return numeral(configuration.value).value();
  };

  private getUnit = (unit: string): Unit => {
    if (unit === 'cal') {
      return Unit.Calories;
    }
    return Unit.Meter;
  };

  private getConversionResult = (conversion: ExerciseConversion): ConversionResult => {
    switch (conversion.unit) {
      case Unit.Meter:
        return new ConversionResult(conversion.value, 'm');
      case Unit.Calories:
        return new ConversionResult(conversion.value, 'cal');
      case Unit.Reps:
        return new ConversionResult(conversion.value, 'rep');
    }
    throw new Error("Can't name unit " + conversion.unit);
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
