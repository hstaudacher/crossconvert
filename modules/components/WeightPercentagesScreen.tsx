/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable, Keyboard, KeyboardAvoidingView} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager} from './weight/WeightPercentager';
import {store as weightSettingsStore, WeightSettings} from './store/WeightSettingsStore';
import {SwipeListView} from 'react-native-swipe-list-view';
import WeightPercentagesListItem from './WeightPercentagesListItem';
import WeightPercentageScreenNavigation from './WeightPercentagesScreenNavigation';
import WeightPercentagesAddView from './WeightPercentagesAddView';
import {WeightPercentageRange, store} from './store/WeightPercentageRangeStore';

interface WeightPercentagesScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const WeightPercentagesScreen = (props: WeightPercentagesScreenProperties) => {
  const [weightSettings, setWeightSettings] = useState(weightSettingsStore.getSettings());
  const [percentageRange, setPercentageRange] = useState(store.getRange());

  const updateWeightSettings = (settings: WeightSettings) => {
    setWeightSettings(settings);
    weightSettingsStore.store(settings);
  };

  new WeightPercentageScreenNavigation(props.componentId).setup(weightSettings, updateWeightSettings);

  const closePercentageMenu = (row: any, rows: any) => {
    if (rows[row.index]) {
      rows[row.index].closeRow();
    }
  };

  const deletePercentage = (row: any, rows: any) => {
    closePercentageMenu(row, rows);
    const newRange = [...percentageRange.range];
    const indexToDelete = newRange.findIndex((p, index) => index === row.index);
    newRange.splice(indexToDelete, 1);
    const range = new WeightPercentageRange(newRange);
    store.store(range);
    setPercentageRange(range);
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

  const [verticalOffset, changeVerticalOffset] = React.useState(80);

  // TODO: extract to new file (also in MainScreen)
  useEffect(() => {
    let isMounted = true;
    Navigation.constants().then((constants) => {
      if (isMounted) {
        changeVerticalOffset(constants.topBarHeight + constants.statusBarHeight);
      }
    });
    return () => {
      isMounted = false;
    };
  });

  const addPercentage = (newPercentage: number) => {
    const newPercentages = [...percentageRange.range];
    if (newPercentages.indexOf(newPercentage) === -1) {
      newPercentages.push(newPercentage);
    }
    const range = new WeightPercentageRange(newPercentages.sort((a, b) => b - a));
    store.store(range);
    setPercentageRange(range);
  };

  const weightPercentager = new WeightPercentager(props.configuration);
  const weightPercentages = weightPercentager.getPercentages(percentageRange.range);

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="position"
          keyboardVerticalOffset={verticalOffset}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.view}>
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
          </View>
          <Divider />
          <WeightPercentagesAddView addPercentageCallback={addPercentage} />
        </KeyboardAvoidingView>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f1f6',
    flex: 7,
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
