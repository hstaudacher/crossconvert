/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, SectionList, Switch, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {OptionsSettingsItem, SettingsItem, SettingsSection, SettingsType} from './SettingsListTypes';

interface WeightPercentagesSettingsScreenProperties extends NavigationComponentProps {}

const PLATE_OPTIONS = [0, 2, 4, 6, 8, 10];

class PlateAvailability {
  constructor(readonly weight: string, readonly availability: number) {}
}

class WeightSettings {
  constructor(readonly barWeight: string, readonly availablePlates: PlateAvailability[] = []) {}

  public availability = (weight: string) => {
    const plateAvailability = this.availablePlates.find((a) => a.weight === weight);
    return plateAvailability?.availability;
  };

  public updateBarWeight = (newWeight: string) => {
    return new WeightSettings(newWeight, this.availablePlates);
  };

  public updateAvailability = (weight: string, availability: number) => {
    const index = this.availablePlates.findIndex((a) => a.weight === weight);
    this.availablePlates[index] = new PlateAvailability(weight, availability);
    return new WeightSettings(this.barWeight, this.availablePlates);
  };
}

const WeightPercentagesSettingsScreen = (props: WeightPercentagesSettingsScreenProperties) => {
  const [settings, setSettings] = useState(
    new WeightSettings('20kg', [
      new PlateAvailability('25kg', 4),
      new PlateAvailability('20kg', 4),
      new PlateAvailability('15kg', 4),
      new PlateAvailability('10kg', 4),
      new PlateAvailability('5kg', 4),
      new PlateAvailability('2kg', 4),
      new PlateAvailability('1kg', 4),
      new PlateAvailability('0.5kg', 4),
    ]),
  );

  const createPlateItem = (weight: string) => {
    return new OptionsSettingsItem(
      weight,
      PLATE_OPTIONS,
      () => settings.availability(weight),
      (o: number) => setSettings(settings.updateAvailability(weight, o)),
    );
  };

  const SECTIONS: SettingsSection[] = [
    new SettingsSection('Bar', SettingsType.OPTIONS, [
      new OptionsSettingsItem(
        'Bar Weight',
        ['20kg', '16kg', '12kg'],
        () => settings.barWeight,
        (o: number) => setSettings(settings.updateBarWeight(o)),
      ),
    ]),
    new SettingsSection('Plates', SettingsType.OPTIONS, [
      createPlateItem('25kg'),
      createPlateItem('20kg'),
      createPlateItem('10kg'),
      createPlateItem('5kg'),
      createPlateItem('2kg'),
      createPlateItem('1kg'),
      createPlateItem('0.5kg'),
    ]),
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
                color: 'tomato',
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
      color: 'tomato',
    },
  },
};

export default WeightPercentagesSettingsScreen;
