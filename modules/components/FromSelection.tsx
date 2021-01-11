/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {FromOption} from './options/FromOption';

interface FromSelectionProperties {
  unit: string;
  handleClick: (item: FromOption) => void;
  filter: (unit: string) => Array<FromOption>;
}

export const FromSelection = (props: FromSelectionProperties) => {
  return (
    <View>
      {props.filter(props.unit).map((item, i) => (
        <ListItem key={i} bottomDivider onPress={() => props.handleClick(item)}>
          <Icon
            name={item.icon}
            type={item.type}
            reverse={true}
            color={item.color}
            size={26}
            iconProps={{name: item.icon, size: item.selectionIconSize}}
          />
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 28}}>{item.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};
