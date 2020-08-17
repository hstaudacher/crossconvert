/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {convertUiItems, ConvertUiItem} from './ConvertUiItems';

interface ConvertUiItemClickHandler {
  handleClick: (item: ConvertUiItem) => void;
}

export const ConvertDialog = (clickHandler: ConvertUiItemClickHandler) => {
  return (
    <View>
      {convertUiItems.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          titleStyle={{fontSize: 28}}
          leftIcon={{name: item.icon, type: item.type, reverse: true, color: item.color}}
          bottomDivider
          children
          onPress={() => clickHandler.handleClick(item)}
        />
      ))}
    </View>
  );
};
