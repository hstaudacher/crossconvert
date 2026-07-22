import {
  DistanceConverter,
  DistanceUnit,
  Exercise,
  ExerciseConverter,
  ExerciseUnit,
  WeightConverter,
  WeightUnit,
} from './conversion';
import type {CrossFitIconName} from '../icons';

export type UnitKey = 'cal' | 'm' | 'rep' | 'mi' | 'in' | 'ft' | 'lb' | 'kg';
export type OptionId =
  'row' | 'ski' | 'bike' | 'assault-bike' | 'echo-bike' | 'run' | 'burpee' | 'double-under' | 'weight' | 'distance';

export interface UnitOption {
  id: UnitKey;
  label: string;
}

export interface ConversionOption {
  id: OptionId;
  title: string;
  icon: CrossFitIconName;
  color: string;
  exercise?: Exercise;
  kind: 'exercise' | 'weight' | 'distance';
}

export interface ConversionConfiguration {
  unit: UnitKey;
  value: string;
  fromId: OptionId;
}

export interface ConversionResult {
  value: string;
  unit: string;
}

export interface ConvertedOption {
  option: ConversionOption;
  results: ConversionResult[];
}

export const colors = {
  base: '#33618f',
  bar: '#c3272e',
  row: '#36aa40',
  ski: '#33618f',
  bike: '#e8ae28',
  assaultBike: '#af2e33',
  echoBike: 'darkorange',
  run: 'mediumvioletred',
  burpee: 'darkmagenta',
  doubleUnder: 'darkcyan',
} as const;

export const units: UnitOption[] = [
  {id: 'cal', label: 'Calories'},
  {id: 'm', label: 'Meters'},
  {id: 'rep', label: 'Repetitions'},
  {id: 'mi', label: 'Miles'},
  {id: 'in', label: 'Inch'},
  {id: 'ft', label: 'Feet'},
  {id: 'lb', label: 'Pounds'},
  {id: 'kg', label: 'Kilogram'},
];

export const conversionOptions: ConversionOption[] = [
  {id: 'row', title: 'Row', icon: 'rower', color: colors.row, exercise: Exercise.Row, kind: 'exercise'},
  {id: 'ski', title: 'Ski', icon: 'skierg', color: colors.ski, exercise: Exercise.Ski, kind: 'exercise'},
  {id: 'bike', title: 'Bike', icon: 'bikeerg', color: colors.bike, exercise: Exercise.Bike, kind: 'exercise'},
  {
    id: 'assault-bike',
    title: 'AssaultBike',
    icon: 'assaultbike',
    color: colors.assaultBike,
    exercise: Exercise.AssaultBike,
    kind: 'exercise',
  },
  {
    id: 'echo-bike',
    title: 'Echo Bike',
    icon: 'echobike',
    color: colors.echoBike,
    exercise: Exercise.EchoBike,
    kind: 'exercise',
  },
  {id: 'run', title: 'Run', icon: 'run', color: colors.run, exercise: Exercise.Run, kind: 'exercise'},
  {
    id: 'burpee',
    title: 'Burpee',
    icon: 'burpee',
    color: colors.burpee,
    exercise: Exercise.Burpee,
    kind: 'exercise',
  },
  {
    id: 'double-under',
    title: 'Double Under',
    icon: 'doubleunder',
    color: colors.doubleUnder,
    exercise: Exercise.DoubleUnder,
    kind: 'exercise',
  },
  {id: 'weight', title: 'Weight', icon: 'barbell', color: colors.bar, kind: 'weight'},
  {id: 'distance', title: 'Distance', icon: 'distance', color: colors.bar, kind: 'distance'},
];

const optionsByUnit: Record<UnitKey, OptionId[]> = {
  cal: ['row', 'ski', 'assault-bike', 'echo-bike', 'bike'],
  m: ['row', 'ski', 'bike', 'run', 'distance'],
  rep: ['burpee', 'double-under'],
  mi: ['row', 'ski', 'bike', 'run', 'distance'],
  in: ['distance'],
  ft: ['distance'],
  lb: ['weight'],
  kg: ['weight'],
};

export function getOption(id: OptionId): ConversionOption {
  const option = conversionOptions.find(candidate => candidate.id === id);
  if (!option) {
    throw new Error(`Unknown conversion option: ${id}`);
  }
  return option;
}

export function fromOptions(unit: UnitKey): ConversionOption[] {
  return optionsByUnit[unit].map(getOption);
}

export function parseValue(value: string): number {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function configurationTitle(configuration: ConversionConfiguration): string {
  return `${configuration.value || '0'}${configuration.unit}`;
}

export function getConversions(configuration: ConversionConfiguration): ConvertedOption[] {
  const from = getOption(configuration.fromId);
  return conversionOptions
    .map(option => ({option, results: convertOption(option, from, configuration)}))
    .filter(
      converted => converted.results.length > 0 && (from.kind === 'distance' || converted.option.kind !== 'distance'),
    );
}

function convertOption(
  target: ConversionOption,
  from: ConversionOption,
  configuration: ConversionConfiguration,
): ConversionResult[] {
  if (target.kind === 'exercise' && from.kind === 'exercise' && target.exercise && from.exercise) {
    return convertExercise(target.exercise, from.exercise, configuration);
  }
  if (target.kind === 'weight') {
    return convertWeight(configuration);
  }
  if (target.kind === 'distance') {
    return convertDistance(configuration);
  }
  return [];
}

function convertExercise(target: Exercise, from: Exercise, configuration: ConversionConfiguration): ConversionResult[] {
  if (!['cal', 'm', 'mi', 'rep'].includes(configuration.unit)) {
    return [];
  }
  const unit =
    configuration.unit === 'cal'
      ? ExerciseUnit.Calories
      : configuration.unit === 'rep'
        ? ExerciseUnit.Reps
        : ExerciseUnit.Meter;
  const value =
    configuration.unit === 'mi'
      ? new DistanceConverter(DistanceUnit.Mile, parseValue(configuration.value)).convertTo(DistanceUnit.Meter)
          .toDistance
      : parseValue(configuration.value);
  const converter = new ExerciseConverter(from, unit, value);
  return converter.getSupportedUnits(target).map(targetUnit => {
    const conversion = converter.convertTo(target, targetUnit);
    const resultUnit =
      conversion.unit === ExerciseUnit.Meter ? 'm' : conversion.unit === ExerciseUnit.Calories ? 'cal' : 'rep';
    return {value: formatNumber(conversion.value, resultUnit), unit: resultUnit};
  });
}

function convertWeight(configuration: ConversionConfiguration): ConversionResult[] {
  const value = parseValue(configuration.value);
  if (configuration.unit === 'lb') {
    const result = new WeightConverter(WeightUnit.Pound, value).convertTo(WeightUnit.Kilogram);
    return [{value: formatNumber(result.toWeight, 'kg'), unit: 'kg'}];
  }
  if (configuration.unit === 'kg') {
    const result = new WeightConverter(WeightUnit.Kilogram, value).convertTo(WeightUnit.Pound);
    return [{value: formatNumber(result.toWeight, 'lb'), unit: 'lb'}];
  }
  return [];
}

function convertDistance(configuration: ConversionConfiguration): ConversionResult[] {
  const value = parseValue(configuration.value);
  if (configuration.unit === 'm') {
    const converter = new DistanceConverter(DistanceUnit.Meter, value);
    const results: ConversionResult[] = [];
    if (value > 0 && value <= 100) {
      const feet = converter.convertTo(DistanceUnit.Feet);
      results.push({value: formatNumber(feet.toDistance, 'ft'), unit: 'ft'});
    }
    const miles = converter.convertTo(DistanceUnit.Mile);
    results.push({value: formatNumber(miles.toDistance, 'mi'), unit: 'mi'});
    return results;
  }
  const targets: Partial<Record<UnitKey, [DistanceUnit, DistanceUnit, string]>> = {
    mi: [DistanceUnit.Mile, DistanceUnit.Meter, 'm'],
    in: [DistanceUnit.Inch, DistanceUnit.Centimeter, 'cm'],
    ft: [DistanceUnit.Feet, DistanceUnit.Meter, 'm'],
  };
  const target = targets[configuration.unit];
  if (!target) {
    return [];
  }
  const conversion = new DistanceConverter(target[0], value).convertTo(target[1]);
  return [{value: formatNumber(conversion.toDistance, target[2]), unit: target[2]}];
}

function formatNumber(value: number, unit: string): string {
  let rounded = value;
  let maximumFractionDigits = 0;
  if (value > 0 && value < 1 && unit !== 'cal') {
    maximumFractionDigits = 2;
  } else if (unit === 'm') {
    rounded = Math.round(value / 10) * 10;
  }
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(rounded);
}
