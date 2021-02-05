/* eslint-disable react-native/no-inline-styles */
import {WeightUnit} from '../conversion';
import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {ListItem, Overlay, Text} from 'react-native-elements';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager, WeightPercentage} from './weight/WeightPercentager';
import Color from 'color';
import {PlateDistributor, PlateDistribution} from './weight/PlateDistributor';
import WeightPlatesComponent from './WeightPlatesComponent';
import {renderPlateIcon} from './weight/PlateVisualization';
import {PlateMapping} from './settings/Plates';

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

const getPlates = (weight: number, unit: WeightUnit): PlateDistribution => {
  const distributor = new PlateDistributor(20, unit);
  return distributor.getPlateDistribution(weight);
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

const WeightPercentagesScreen = (props: WeightDetailsScreenProperties) => {
  setupSettingsButton(props);

  const [legendVisible, setLegendVisible] = useState(false);

  const toggleLegend = (percentage: WeightPercentage) => {
    setDistribution(getPlates(percentage.conversion.fromWeight, percentage.conversion.fromUnit));
    setLegendVisible(!legendVisible);
  };

  const [distribution, setDistribution] = useState(new PlateDistribution([], WeightUnit.kg));

  const renderItem = (percentage: WeightPercentage) => {
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

  const percentager = new WeightPercentager(props.configuration);
  const percentages = percentager.getPercentages(120, 50);

  return (
    <>
      <View style={styles.view}>
        <FlatList
          keyExtractor={(e, i) => i.toString()}
          data={percentages}
          renderItem={(info) => renderItem(info.item)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f1f6',
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
