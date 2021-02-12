/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager} from './weight/WeightPercentager';
import {WeightSettingsStore} from './settings/WeightSettings';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeListView} from 'react-native-swipe-list-view';
import WeightPercentagesListItem from './WeightPercentagesListItem';

interface WeightPercentagesScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const setupSettingsButton = (props: WeightPercentagesScreenProperties) => {
  const onSettingsPress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'WeightPercentagesSettings',
        options: {
          topBar: {
            backButton: {
              title: 'Percentages',
            },
          },
        },
      },
    });
  };

  Navigation.mergeOptions(props.componentId, {
    topBar: {
      title: {
        text: 'Percentages',
      },
      rightButtons: [
        {
          id: 'weightPercentagesSettingsButton',
          text: '',
          component: {
            name: 'Icon',
            passProps: {
              name: 'sliders',
              type: 'font-awesome',
              color: 'tomato',
              onPress: onSettingsPress,
            },
          },
        },
      ],
    },
  });
};

const store = new WeightSettingsStore();

const WeightPercentagesScreen = (props: WeightPercentagesScreenProperties) => {
  setupSettingsButton(props);

  const [weightSettings, setWeightSettings] = useState(store.defaultSettings);
  const [percentages, setPercentages] = useState([110, 100, 85]); // TODO: persist

  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener((event) => {
      if (props.componentId === event.componentId) {
        store.load().then((s) => setWeightSettings(s));
      }
    });
    return () => subscription.remove();
  });

  const closePercentageMenu = (row: any, rows: any) => {
    if (rows[row.index]) {
      rows[row.index].closeRow();
    }
  };

  const deletePercentage = (row: any, rows: any) => {
    closePercentageMenu(row, rows);
    const newPercentages = [...percentages];
    const indexToDelete = percentages.findIndex((p, index) => index === row.index);
    newPercentages.splice(indexToDelete, 1);
    setPercentages(newPercentages);
  };

  const renderHiddenItem = (row: any, rows: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deletePercentage(row, rows)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const weightPercentager = new WeightPercentager(props.configuration);
  const weightPercentages = weightPercentager.getPercentages(percentages);

  return (
    <>
      <SafeAreaView style={styles.view}>
        <SwipeListView
          disableRightSwipe
          keyExtractor={(e, i) => i.toString()}
          data={weightPercentages}
          renderItem={(info) => <WeightPercentagesListItem percentage={info.item} settings={weightSettings} />}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f1f6',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

WeightPercentagesScreen.options = {
  topBar: {
    title: {
      text: 'Percentages',
    },
  },
};

export default WeightPercentagesScreen;
