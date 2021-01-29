/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

interface OptionsListScreenProperties extends NavigationComponentProps {
  options: string[];
  selectionCallback: Function;
}

const selectItem = (option: string, selectionCallback: Function, componentId: string) => {
  selectionCallback(option);
  Navigation.pop(componentId);
};

const renderItem = (option: string, selectionCallback: Function, componentId: string) => {
  return (
    <ListItem key={option} bottomDivider onPress={() => selectItem(option, selectionCallback, componentId)}>
      <ListItem.Content>
        <ListItem.Title>{option}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const keyExtractor = (item: string, index: Number): string => {
  return index.toString();
};

const OptionsListScreen = (props: OptionsListScreenProperties) => {
  return (
    <>
      <View style={styles.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={props.options}
          renderItem={(info) => renderItem(info.item, props.selectionCallback, props.componentId)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f1f6',
    flex: 1,
  },
});

OptionsListScreen.options = {
  topBar: {
    title: {
      color: 'tomato',
    },
  },
};

export default OptionsListScreen;
