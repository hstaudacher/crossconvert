/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';

interface UnitSelectionProperties {
  handleClick: (item: string) => void;
}

class UnitEntry {
  constructor(readonly title: string, readonly subtitle: string) {}
}

export const units: Array<UnitEntry> = [
  new UnitEntry('cal', 'Calories'),
  new UnitEntry('m', 'Meters'),
  new UnitEntry('mi', 'Miles'),
  new UnitEntry('ft', 'Feet'),
  new UnitEntry('lbs', 'Pounds'),
  new UnitEntry('kg', 'Kilogram'),
];

export const UnitSelection = (props: UnitSelectionProperties) => {
  return (
    <View>
      {units.map((unit, i) => (
        <ListItem
          key={i}
          title={unit.title}
          subtitle={unit.subtitle}
          titleStyle={{fontSize: 28}}
          bottomDivider
          children
          onPress={() => props.handleClick(unit.title)}
        />
      ))}
    </View>
  );
};
