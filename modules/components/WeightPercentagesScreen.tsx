/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager} from './weight/WeightPercentager';
import {store as weightSettingsStore} from './store/WeightSettingsStore';
import {SwipeListView} from 'react-native-swipe-list-view';
import WeightPercentagesListItem from './WeightPercentagesListItem';
import WeightPercentagesAddView from './WeightPercentagesAddView';
import {WeightPercentageRange, store as rangeStore} from './store/WeightPercentageRangeStore';
import DefaultStyle from './DefaultStyle';

interface WeightPercentagesScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const WeightPercentagesScreen = (props: WeightPercentagesScreenProperties) => {
  const [weightSettings] = useState(weightSettingsStore.getSettings());
  const [percentageRange, setPercentageRange] = useState(rangeStore.getRange());

  rangeStore.addPercentageListener((r: WeightPercentageRange) => setPercentageRange(r));

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
    rangeStore.store(range);
    setPercentageRange(range);
  };

  const renderHiddenItem = (row: any, rows: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deletePercentage(row, rows)}>
        <Icon type="font-awesome" name="trash-o" color="white" size={28} />
      </TouchableOpacity>
    </View>
  );

  const addPercentage = (newPercentage: number) => {
    const newPercentages = [...percentageRange.range];
    if (newPercentages.indexOf(newPercentage) === -1) {
      newPercentages.push(newPercentage);
    }
    const range = new WeightPercentageRange(newPercentages.sort((a, b) => b - a));
    rangeStore.store(range);
    setPercentageRange(range);
  };

  const weightPercentager = new WeightPercentager(props.configuration);
  const weightPercentages = weightPercentager.getPercentages(percentageRange.range);

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={styles.view}>
            <SwipeListView
              disableRightSwipe
              keyExtractor={(e, i) => i.toString()}
              data={weightPercentages}
              renderItem={info => (
                <WeightPercentagesListItem
                  percentage={info.item}
                  settings={weightSettings}
                  displayInConversion={false}
                />
              )}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          </View>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            keyboardVerticalOffset={70}
            contentContainerStyle={{flex: 1}}>
            <WeightPercentagesAddView addPercentageCallback={addPercentage} />
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </>
  );
};

WeightPercentagesScreen.options = () => {
  return {
    topBar: {
      rightButtons: [
        {
          id: 'clearButton',
          text: '',
          showAsAction: 'always',
          component: {
            name: 'Icon',
            width: 50,
            passProps: {
              name: 'trash-o',
              type: 'font-awesome',
              color: DefaultStyle.barColor,
              // TODO: add confirmation dialog
              onPress: () => rangeStore.store(new WeightPercentageRange([])),
            },
          },
        },
      ],
    },
  };
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
});

export default WeightPercentagesScreen;
