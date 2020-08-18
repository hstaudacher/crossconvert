/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';

interface UnitDialogProperties {
  handleClick: (item: string) => void;
}

const units = [
  {title: 'cals', subtitle: 'Calories'},
  {title: 'm', subtitle: 'Meters'},
  {title: 'lbs', subtitle: 'Pounds'},
  {title: 'kg', subtitle: 'Kilogram'},
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
