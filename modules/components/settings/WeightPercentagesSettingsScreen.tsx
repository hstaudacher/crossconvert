/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, SectionList, Switch, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {renderPlateIcon} from '../weight/PlateVisualization';
import {Plate, PlateMapping, plateMappings} from './Plates';
import {OptionsSettingsItem, SettingsItem, SettingsSection, SettingsType} from './SettingsListTypes';

interface WeightPercentagesSettingsScreenProperties extends NavigationComponentProps {}

const PLATE_OPTIONS = [0, 2, 4, 6, 8, 10];

// TODO: add icon for plates
// TODO: persist state

class PlateAvailability {
  constructor(readonly mapping: PlateMapping, readonly availability: number) {}
}

class WeightSettings {
  constructor(readonly barWeight: string, readonly availablePlates: PlateAvailability[] = []) {}

  public availability(plate: Plate) {
    const plateAvailability = this.availablePlates.find((a) => a.mapping.plate === plate);
    return plateAvailability?.availability;
  }

  public updateBarWeight(newWeight: string) {
    return new WeightSettings(newWeight, this.availablePlates);
  }

  public updateAvailability(plate: Plate, availability: number) {
    const index = this.availablePlates.findIndex((a) => a.mapping.plate === plate);
    const mapping = this.findMapping(plate);
    this.availablePlates[index] = new PlateAvailability(mapping, availability);
    return new WeightSettings(this.barWeight, this.availablePlates);
  }

  private findMapping(plate: Plate) {
    const mapping = this.availablePlates.find((a) => a.mapping.plate === plate)?.mapping;
    if (typeof mapping === 'undefined') {
      throw new Error('could no find mapping for plate: ' + plate.toString());
    }
    return mapping;
  }
}

const WeightPercentagesSettingsScreen = (props: WeightPercentagesSettingsScreenProperties) => {
  const [settings, setSettings] = useState(
    new WeightSettings(
      '20kg',
      plateMappings().map((m) => new PlateAvailability(m, 4)),
    ),
  );

  const createPlateItem = (mapping: PlateMapping) => {
    return new OptionsSettingsItem(
      mapping.kg + 'kg/' + mapping.lbs + 'lbs',
      PLATE_OPTIONS,
      () => settings.availability(mapping.plate),
      (o: number) => setSettings(settings.updateAvailability(mapping.plate, o)),
      () => renderPlateIcon(mapping.plate, {alignSelf: 'flex-end', width: 40}),
    );
  };

  const SECTIONS: SettingsSection[] = [
    new SettingsSection('Bar', SettingsType.OPTIONS, [
      new OptionsSettingsItem(
        'Bar Weight',
        ['20kg', '16kg', '12kg'],
        () => settings.barWeight,
        (o: string) => setSettings(settings.updateBarWeight(o)),
        () => <Icon name="barbell" type="crossfit" />,
      ),
    ]),
    new SettingsSection(
      'Plates',
      SettingsType.OPTIONS,
      plateMappings().map((m) => createPlateItem(m)),
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
        return <Text style={{fontSize: 16}}>{(item as OptionsSettingsItem).value()}</Text>;
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
    },
  },
};

export default WeightPercentagesSettingsScreen;
