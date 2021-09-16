/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SectionList, Switch, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {renderPlateIcon} from '../weight/PlateVisualization';
import {Bar, bars} from './Bar';
import {PlateMapping, plateMappings} from './Plates';
import {OptionsSettingsItem, SettingsItem, SettingsSection, SettingsType} from './SettingsListTypes';
import {WeightSettings} from '../store/WeightSettingsStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import DefaultStyle from '../DefaultStyle';
import {store as weightSettingsStore} from '../store/WeightSettingsStore';

interface SettingsScreenProperties extends NavigationComponentProps {
  settings: WeightSettings;
}

const PLATE_OPTIONS = [0, 2, 4, 6, 8, 10];

const SettingsScreen = (props: SettingsScreenProperties) => {
  const [settings, setSettings] = useState(weightSettingsStore.getSettings());

  const updateSettings = (newSettings: WeightSettings) => {
    setSettings(newSettings);
    weightSettingsStore.store(newSettings);
  };

  const updateBar = (newSettings: WeightSettings) => {
    updateSettings(newSettings);
  };

  const createPlateItem = (mapping: PlateMapping) => {
    return new OptionsSettingsItem(
      mapping.kg + 'kg/' + mapping.lb + 'lb',
      PLATE_OPTIONS,
      () => settings.availability(mapping.plate),
      (o: number) => updateSettings(settings.updateAvailability(mapping.plate, o)),
      () => renderPlateIcon(mapping.plate, styles.listIcon),
    );
  };

  const SECTIONS: SettingsSection[] = [
    new SettingsSection('Bar', SettingsType.OPTIONS, [
      new OptionsSettingsItem(
        'Bar Weight',
        bars(),
        () => settings.bar,
        (o: Bar) => updateBar(settings.updateBar(o)),
        () => <Icon name="barbell" type="crossfit" color={DefaultStyle.barColor} style={styles.listIcon} />,
      ),
    ]),
    new SettingsSection(
      'Available Plates',
      SettingsType.OPTIONS,
      plateMappings().map(m => createPlateItem(m)),
    ),
  ];

  const optionSelected = (item: OptionsSettingsItem, option: string) => {
    item.update(option);
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
              },
              title: {text: item.title},
            },
          },
          passProps: {
            item: item as OptionsSettingsItem,
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
        return <Text style={{fontSize: 16}}>{(item as OptionsSettingsItem).value().toString()}</Text>;
    }
  };
  const renderItem = (item: SettingsItem, componentId: string) => {
    return (
      <ListItem key={item.title} bottomDivider onPress={() => openOptions(item, componentId)}>
        {item.renderIcon()}
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        {renderRightSide(item)}
      </ListItem>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={SECTIONS}
          keyExtractor={(item, index) => item.title + index}
          renderItem={i => renderItem(i.item, props.componentId)}
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
    backgroundColor: DefaultStyle.baseColor,
  },
  listIcon: {alignSelf: 'flex-end', width: 40},
});

SettingsScreen.options = {
  topBar: {
    title: {
      text: 'Settings',
    },
  },
};

export default SettingsScreen;
