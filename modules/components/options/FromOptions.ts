import {FromOption} from './FromOption';
import WeightOption from './WeightOption';
import DistanceOption from './DistanceOption';
import ExerciseOption from './ExerciseOption';
import {Exercise} from '../../conversion';

const options: Array<FromOption> = [
  new ExerciseOption('Row', 'rower', 'crossfit', 'tomato', Exercise.Row),
  new ExerciseOption('Ski', 'skierg', 'crossfit', 'lightblue', Exercise.Ski),
  new ExerciseOption('Bike', 'bikeerg', 'crossfit', 'orange', Exercise.Bike),
  new ExerciseOption('Air Bike', 'airbike', 'crossfit', 'purple', Exercise.Airbike),
  new ExerciseOption('Run', 'running', 'font-awesome-5', 'blue', Exercise.Run),
  new ExerciseOption('Burpee', 'accessibility', 'material', 'deeppink', Exercise.Burpee),
  new WeightOption('Weight', 'barbell-outline', 'ionicon', 'green'),
  new DistanceOption('Distance', 'ruler', 'font-awesome-5', 'firebrick'),
];

export const fromOptions = (unit: string): Array<FromOption> => {
  if (unit === 'cal') {
    return reduceOptions(['Row', 'Ski', 'Air Bike', 'Bike']);
  } else if (unit === 'm' || unit === 'mi') {
    return reduceOptions(['Row', 'Ski', 'Bike', 'Run', 'Distance']);
  } else if (unit === 'lbs' || unit === 'kg') {
    return reduceOptions(['Weight']);
  } else if (unit === 'ft' || unit === 'in') {
    return reduceOptions(['Distance']);
  } else if (unit === 'all') {
    return options;
  }
  return [];
};

const reduceOptions = (mustBeContained: Array<string>): Array<FromOption> => {
  return options.filter((i) => {
    return mustBeContained.find((title) => title === i.title) !== undefined;
  });
};
