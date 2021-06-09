import {FromOption} from './FromOption';
import WeightOption from './WeightOption';
import DistanceOption from './DistanceOption';
import ExerciseOption from './ExerciseOption';
import {Exercise} from '../../conversion';
import DefaultStyle from '../DefaultStyle';

const options: Array<FromOption> = [
  new ExerciseOption('Row', 'rower', 'crossfit', '#36aa40', 40, 40, Exercise.Row),
  new ExerciseOption('Ski', 'skierg', 'crossfit', '#33618f', 40, 40, Exercise.Ski),
  new ExerciseOption('Bike', 'bikeerg', 'crossfit', '#e8ae28', 35, 40, Exercise.Bike),
  new ExerciseOption('Air Bike', 'airbike', 'crossfit', '#af2e33', 35, 40, Exercise.Airbike),
  new ExerciseOption('Run', 'run', 'crossfit', 'coral', 32, 40, Exercise.Run),
  new ExerciseOption('Burpee', 'burpee', 'crossfit', 'darkmagenta', 35, 40, Exercise.Burpee),
  new ExerciseOption('Double Under', 'doubleunder', 'crossfit', 'darkcyan', 35, 40, Exercise.DoubleUnder),
  new WeightOption('Weight', 'barbell', 'crossfit', DefaultStyle.barColor, 45, 40),
  new DistanceOption('Distance', 'distance', 'crossfit', '#c3272e', 35, 40),
];

export const fromOptions = (unit: string): Array<FromOption> => {
  if (unit === 'cal') {
    return reduceOptions(['Row', 'Ski', 'Air Bike', 'Bike']);
  } else if (unit === 'm' || unit === 'mi') {
    return reduceOptions(['Row', 'Ski', 'Bike', 'Run', 'Distance']);
  } else if (unit === 'lb' || unit === 'kg') {
    return reduceOptions(['Weight']);
  } else if (unit === 'ft' || unit === 'in') {
    return reduceOptions(['Distance']);
  } else if (unit === 'rep') {
    return reduceOptions(['Burpee', 'Double Under']);
  } else if (unit === 'all') {
    return options;
  }
  return [];
};

const reduceOptions = (mustBeContained: Array<string>): Array<FromOption> => {
  return options.filter(i => {
    return mustBeContained.find(title => title === i.title) !== undefined;
  });
};
