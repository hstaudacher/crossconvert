import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {OptionsSettingsItem} from './SettingsListTypes';

interface OptionsListScreenProperties extends NavigationComponentProps {
  item: OptionsSettingsItem;
  options: any[];
  selectionCallback: Function;
}

const selectItem = (option: any, props: OptionsListScreenProperties) => {
  props.selectionCallback(props.item, option);
  Navigation.pop(props.componentId);
};

const renderItem = (option: any, props: OptionsListScreenProperties) => {
  return (
    <ListItem key={option} bottomDivider onPress={() => selectItem(option, props)}>
      <ListItem.Content>
        <ListItem.Title>{option.toString()}</ListItem.Title>
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
          renderItem={(info) => renderItem(info.item, props)}
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

export default OptionsListScreen;
