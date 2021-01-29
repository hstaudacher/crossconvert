/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, SectionList, Switch, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {OptionsSettingsItem, SettingsItem, SettingsSection, SettingsType} from './Settings';

interface WeightPercentagesSettingsScreenProperties extends NavigationComponentProps {}

const SECTIONS: SettingsSection[] = [
  new SettingsSection('Bar', SettingsType.OPTIONS, [new OptionsSettingsItem('Bar Weight', ['20kg', '16kg', '12kg'])]),
  new SettingsSection('Plates', SettingsType.BOOLEAN, [
    new SettingsItem('25kg'),
    new SettingsItem('20kg'),
    new SettingsItem('15kg'),
    new SettingsItem('10kg'),
    new SettingsItem('5kg'),
    new SettingsItem('2kg'),
    new SettingsItem('1kg'),
    new SettingsItem('0.5kg'),
  ]),
];

const optionSelected = (item: string) => {
  console.log('selected ' + item);
};

const openOptions = (item: SettingsItem, componentId: string) => {
  if (item.section.type === SettingsType.OPTIONS) {
    Navigation.push(componentId, {
      component: {
        name: 'OptionsList',
        options: {
          topBar: {
            backButton: {
              title: 'Settings',
              color: 'tomato',
            },
            title: {text: 'Bar Weight'},
          },
        },
        passProps: {
          options: (item as OptionsSettingsItem).options,
          selectionCallback: optionSelected,
        },
      },
    });
  }
};

const renderRightSide = (item: SettingsItem): Element | void => {
  switch (item.section.type) {
    case SettingsType.BOOLEAN:
      return <Switch value={true} />;
    case SettingsType.OPTIONS:
      return <Text style={{fontSize: 16}}>{(item as OptionsSettingsItem).options[0]}</Text>;
  }
};

const renderItem = (item: SettingsItem, componentId: string) => {
  return (
    <ListItem key={item.title} bottomDivider onPress={() => openOptions(item, componentId)}>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      {renderRightSide(item)}
    </ListItem>
  );
};

const WeightPercentagesSettingsScreen = (props: WeightPercentagesSettingsScreenProperties) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={SECTIONS}
          keyExtractor={(item, index) => item.title + index}
          renderItem={(i) => renderItem(i.item, props.componentId)}
          renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f1f6',
    flex: 1,
  },
  header: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'tomato',
  },
});

WeightPercentagesSettingsScreen.options = {
  topBar: {
    title: {
      text: 'Weight Settings',
      color: 'tomato',
    },
  },
};

export default WeightPercentagesSettingsScreen;
