export class ConvertUiItem {
  constructor(readonly title: string, readonly icon: string, readonly type: string, readonly color: string) {}
}

export const convertUiItems: Array<ConvertUiItem> = [
  new ConvertUiItem('Row', 'rowing', 'material', 'tomato'),
  new ConvertUiItem('Ski', 'skiing-nordic', 'font-awesome-5', 'lightblue'),
  new ConvertUiItem('Bike', 'biking', 'font-awesome-5', 'orange'),
  new ConvertUiItem('Air Bike', 'skull-crossbones', 'font-awesome-5', 'grey'),
  new ConvertUiItem('Run', 'running', 'font-awesome-5', 'blue'),
  new ConvertUiItem('Weight', 'barbell-outline', 'ionicon', 'green'),
  new ConvertUiItem('Distance', 'ruler', 'font-awesome-5', 'firebrick'),
];
