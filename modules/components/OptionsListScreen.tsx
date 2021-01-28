/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {NavigationComponentProps} from 'react-native-navigation';

interface OptionsListScreenProperties extends NavigationComponentProps {
  options: string[];
  // TODO: callback
}

const renderItem = (option: string) => {
  return (
    <ListItem key={option} bottomDivider>
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
        <FlatList keyExtractor={keyExtractor} data={props.options} renderItem={(info) => renderItem(info.item)} />
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
