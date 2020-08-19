/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';

interface UnitDialogProperties {
  handleClick: (item: string) => void;
}

export class UiUnit {
  constructor(readonly title: string, readonly subtitle: string) {}
}

export const units: Array<UiUnit> = [
  new UiUnit('cal', 'Calories'),
  new UiUnit('m', 'Meters'),
  new UiUnit('mi', 'Miles'),
  new UiUnit('ft', 'Feet'),
  new UiUnit('lbs', 'Pounds'),
  new UiUnit('kg', 'Kilogram'),
];

export const UnitDialog = (props: UnitDialogProperties) => {
  return (
    <View>
      {units.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          subtitle={item.subtitle}
          titleStyle={{fontSize: 28}}
          bottomDivider
          children
          onPress={() => props.handleClick(item.title)}
        />
      ))}
    </View>
  );
};
