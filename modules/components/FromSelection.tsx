/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {FromOption} from './FromOptions';

interface FromSelectionProperties {
  unit: string;
  handleClick: (item: FromOption) => void;
  filter: (unit: string) => Array<FromOption>;
}

export const FromSelection = (props: FromSelectionProperties) => {
  return (
    <View>
      {props.filter(props.unit).map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          titleStyle={{fontSize: 28}}
          leftIcon={{name: item.icon, type: item.type, reverse: true, color: item.color}}
          bottomDivider
          children
          onPress={() => props.handleClick(item)}
        />
      ))}
    </View>
  );
};
