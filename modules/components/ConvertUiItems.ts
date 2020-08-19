export class ConvertUiItem {
  constructor(readonly title: string, readonly icon: string, readonly type: string, readonly color: string) {}
}

const convertUiItems: Array<ConvertUiItem> = [
  new ConvertUiItem('Row', 'rowing', 'material', 'tomato'),
  new ConvertUiItem('Ski', 'skiing-nordic', 'font-awesome-5', 'lightblue'),
  new ConvertUiItem('Bike', 'biking', 'font-awesome-5', 'orange'),
  new ConvertUiItem('Air Bike', 'skull-crossbones', 'font-awesome-5', 'grey'),
  new ConvertUiItem('Run', 'running', 'font-awesome-5', 'blue'),
  new ConvertUiItem('Weight', 'barbell-outline', 'ionicon', 'green'),
  new ConvertUiItem('Distance', 'ruler', 'font-awesome-5', 'firebrick'),
];

const reduceItems = (toContain: Array<string>): Array<ConvertUiItem> => {
  return convertUiItems.filter((i) => {
    return toContain.find((title) => title === i.title) !== undefined;
  });
};

export const filterFromItems = (unit: string): Array<ConvertUiItem> => {
  if (unit === 'cal') {
    return reduceItems(['Row', 'Ski', 'Air Bike', 'Bike']);
  } else if (unit === 'm' || unit === 'mi') {
    return reduceItems(['Row', 'Ski', 'Air Bike', 'Bike', 'Run', 'Distance']);
  } else if (unit === 'lbs' || unit === 'kg') {
    return reduceItems(['Weight']);
  } else if (unit === 'ft') {
    return reduceItems(['Distance']);
  }
  return [];
};

export const filterToItems = (unit: string): Array<ConvertUiItem> => {
  if (unit === 'cal') {
    return reduceItems(['Row', 'Ski', 'Air Bike', 'Bike', 'Run']);
  } else if (unit === 'm') {
    return reduceItems(['Row', 'Ski', 'Air Bike', 'Bike', 'Run']);
  }
  return [];
};
