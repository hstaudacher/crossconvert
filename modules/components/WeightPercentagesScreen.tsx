/* eslint-disable react-native/no-inline-styles */
import {WeightUnit} from '../conversion';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import {Icon, ListItem, Overlay, Text} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager, WeightPercentage} from './weight/WeightPercentager';
import Color from 'color';
import {PlateDistributor, PlateDistribution} from './weight/PlateDistributor';
import WeightPlatesComponent from './WeightPlatesComponent';
import {renderPlateIcon} from './weight/PlateVisualization';
import {PlateMapping} from './settings/Plates';
import {WeightSettingsStore} from './settings/WeightSettings';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeListView} from 'react-native-swipe-list-view';

interface WeightDetailsScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const formatUnit = (unit: WeightUnit): string => {
  return unit === WeightUnit.kg ? 'kg' : 'lbs';
};

const computeFontColor = (percentage: number): string => {
  if (percentage > 100) {
    return Color('#ff6347')
      .lighten((percentage - 100) / 200)
      .hex()
      .toString();
  }
  if (percentage < 100) {
    return Color('#ff6347')
      .lighten((100 - percentage) / 200)
      .hex()
      .toString();
  }
  return '#ff4500';
};

const getWeightText = (mapping: PlateMapping, unit: WeightUnit) => {
  if (unit === WeightUnit.kg) {
    return mapping.kg + 'kg';
  }
  return mapping.lbs + 'lbs';
};

const setupSettingsButton = (props: WeightDetailsScreenProperties) => {
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

const WeightPercentagesScreen = (props: WeightDetailsScreenProperties) => {
  setupSettingsButton(props);

  const [weightSettings, setWeightSettings] = useState(store.defaultSettings);
  useEffect(() => {
    const subscription = Navigation.events().registerComponentDidAppearListener((event) => {
      if (props.componentId === event.componentId) {
        store.load().then((s) => setWeightSettings(s));
      }
    });

    return () => subscription.remove();
  });

  const getPlates = (weight: number, unit: WeightUnit): PlateDistribution => {
    const distributor = new PlateDistributor(weightSettings, unit);
    return distributor.getPlateDistribution(weight);
  };

  const [legendVisible, setLegendVisible] = useState(false);

  const toggleLegend = (percentage: WeightPercentage) => {
    setDistribution(getPlates(percentage.conversion.fromWeight, percentage.conversion.fromUnit));
    setLegendVisible(!legendVisible);
  };

  const [distribution, setDistribution] = useState(new PlateDistribution([], WeightUnit.kg));

  const renderItem = (percentage: WeightPercentage) => {
    const renderCantDistribute = () => {
      if (!distribution.completelyDistributed) {
        return (
          <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}} key={'na'}>
            <Icon
              key={'na'}
              name={'exclamation-triangle'}
              type={'font-awesome'}
              color={'tomato'}
              size={25}
              containerStyle={{alignSelf: 'flex-end', width: 40}}
              reverse={false}
            />
            <Text h4 style={{alignSelf: 'center', marginLeft: 8, color: 'tomato'}}>
              Not enough plates
            </Text>
          </View>
        );
      }
    };

    return (
      <>
        <ListItem bottomDivider onPress={() => toggleLegend(percentage)}>
          <Text style={{fontSize: 30, color: computeFontColor(percentage.percentage)}}>{percentage.percentage}%</Text>
          <ListItem.Content style={{alignItems: 'flex-end'}}>
            <ListItem.Title style={{fontSize: 25, opacity: 0.9}}>
              <Text>
                {percentage.conversion.fromWeight}
                {formatUnit(percentage.conversion.fromUnit)}
              </Text>
              <Text style={{fontSize: 20, opacity: 0.6}}> / </Text>
              <Text style={{fontSize: 20, opacity: 0.6}}>
                {percentage.conversion.toWeight}
                {formatUnit(percentage.conversion.toUnit)}
              </Text>
            </ListItem.Title>
            <ListItem.Subtitle style={{opacity: 0.9, marginTop: 4}}>
              <View>
                <WeightPlatesComponent
                  plateDistribution={getPlates(percentage.conversion.fromWeight, percentage.conversion.fromUnit)}
                />
              </View>
            </ListItem.Subtitle>
            <Overlay
              isVisible={legendVisible}
              onBackdropPress={() => toggleLegend(percentage)}
              overlayStyle={{borderRadius: 5}}>
              <View style={{paddingTop: 10}}>
                {renderCantDistribute()}
                {distribution.getPlateGroups().map((group) => (
                  <View
                    style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}}
                    key={group.mapping.plate.toString()}>
                    {renderPlateIcon(group.mapping.plate, {alignSelf: 'flex-end', width: 40})}
                    <Text h4 style={{alignSelf: 'center', marginLeft: 8, color: 'tomato'}}>
                      {group.amount}x{' '}
                    </Text>
                    <Text h4 style={{alignSelf: 'center'}}>
                      {getWeightText(group.mapping, percentage.conversion.fromUnit)}
                    </Text>
                  </View>
                ))}
              </View>
            </Overlay>
          </ListItem.Content>
        </ListItem>
      </>
    );
  };

  const [percentages, setPercentages] = useState([110, 100, 85]);

  const weightPercentager = new WeightPercentager(props.configuration);
  const weightPercentages = weightPercentager.getPercentages(percentages);

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

  return (
    <>
      <SafeAreaView style={styles.view}>
        <SwipeListView
          disableRightSwipe
          keyExtractor={(e, i) => i.toString()}
          data={weightPercentages}
          renderItem={(info) => renderItem(info.item)}
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
