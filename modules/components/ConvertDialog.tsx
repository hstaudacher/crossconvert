/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {filterItems, ConvertUiItem} from './ConvertUiItems';

interface ConvertDialogProperties {
  unit: string;
  handleClick: (item: ConvertUiItem) => void;
}

export const ConvertDialog = (props: ConvertDialogProperties) => {
  return (
    <View>
      {filterItems(props.unit).map((item, i) => (
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
