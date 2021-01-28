/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, SectionList, Switch, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

interface WeightPercentagesSettingsScreenProperties extends NavigationComponentProps {}

class SettingsItem {
  constructor(
    readonly title: string,
    readonly type: string,
    readonly data: string[],
    readonly options: string[] = [],
  ) {}
}

const DATA: SettingsItem[] = [
  new SettingsItem('Bar', 'options', ['Bar Weight'], ['20kg', '16kg', '12kg']),
  new SettingsItem('Plates', 'boolean', ['25kg', '20kg', '15kg', '10kg', '5kg', '2kg', '1kg', '0.5kg']),
];

const openOptions = (item: SettingsItem, componentId: string) => {
  if (item.type === 'options') {
    Navigation.push(componentId, {
      component: {
        name: 'OptionsList',
        options: {
          topBar: {
            backButton: {
              title: 'Weight Settings',
              color: 'tomato',
            },
            title: {text: 'Bar Weight'},
          },
        },
        passProps: {
          options: item.options,
        },
      },
    });
  }
};

const renderRightSide = (item: SettingsItem): Element | void => {
  if (item.type === 'boolean') {
    return <Switch value={true} />;
  } else if (item.type === 'options') {
    return <Text style={{fontSize: 16}}>{item.options[0]}</Text>;
  }
};

const renderItem = (title: string, componentId: string) => {
  console.log('filter for: ' + title);
  const item = DATA.filter((i) => i.data.filter((d) => d === title)[0])[0];
  console.log('item: ' + JSON.stringify(item));
  return (
    <ListItem key={title} bottomDivider onPress={() => openOptions(item, componentId)}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
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
          sections={DATA}
          keyExtractor={(item, index) => item + index}
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
