import {FromOption} from './FromOption';
import RowOption from './RowOption';
import SkiOption from './SkiOption';
import BikeOption from './BikeOption';
import AirBikeOption from './AirBikeOption';
import RunOption from './RunOption';
import WeightOption from './WeightOption';
import DistanceOption from './DistanceOption';

const options: Array<FromOption> = [
  new RowOption(),
  new SkiOption(),
  new BikeOption(),
  new AirBikeOption(),
  new RunOption(),
  new WeightOption(),
  new DistanceOption(),
];

const reduceOptions = (mustBeContained: Array<string>): Array<FromOption> => {
  return options.filter((i) => {
    return mustBeContained.find((title) => title === i.title) !== undefined;
  });
};

export const fromOptions = (unit: string): Array<FromOption> => {
  if (unit === 'cal') {
    return reduceOptions(['Row', 'Ski', 'Air Bike', 'Bike']);
  } else if (unit === 'm' || unit === 'mi') {
    return reduceOptions(['Row', 'Ski', 'Air Bike', 'Bike', 'Run', 'Distance']);
  } else if (unit === 'lbs' || unit === 'kg') {
    return reduceOptions(['Weight']);
  } else if (unit === 'ft') {
    return reduceOptions(['Distance']);
  } else if (unit === 'all') {
    return options;
  }
  return [];
};
