export class FromOption {
  constructor(readonly title: string, readonly icon: string, readonly type: string, readonly color: string) {}
}

const options: Array<FromOption> = [
  new FromOption('Row', 'rowing', 'material', 'tomato'),
  new FromOption('Ski', 'skiing-nordic', 'font-awesome-5', 'lightblue'),
  new FromOption('Bike', 'biking', 'font-awesome-5', 'orange'),
  new FromOption('Air Bike', 'skull-crossbones', 'font-awesome-5', 'purple'),
  new FromOption('Run', 'running', 'font-awesome-5', 'blue'),
  new FromOption('Weight', 'barbell-outline', 'ionicon', 'green'),
  new FromOption('Distance', 'ruler', 'font-awesome-5', 'firebrick'),
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
