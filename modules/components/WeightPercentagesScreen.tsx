/* eslint-disable react-native/no-inline-styles */
import {WeightUnit} from '../conversion';
import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager, WeightPercentage} from './weight/WeightPercentager';
import Color from 'color';
import {PlateDistributor} from './weight/PlateDistributor';

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

const getPlates = (weight: number, unit: WeightUnit): string => {
  const distributor = new PlateDistributor(20, unit);
  return JSON.stringify(distributor.getPlateDistribution(weight).plates);
};

const renderItem = (percentage: WeightPercentage) => {
  return (
    <>
      <ListItem bottomDivider>
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
          <ListItem.Subtitle style={{opacity: 0.6}}>
            {getPlates(percentage.conversion.fromWeight, percentage.conversion.fromUnit)}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const keyExtractor = (item: WeightPercentage, index: Number): string => {
  return index.toString();
};

const WeightPercentagesScreen = (props: WeightDetailsScreenProperties) => {
  const percentager = new WeightPercentager(props.configuration);
  const percentages = percentager.getPercentages(120, 50);
  return (
    <>
      <View>
        <FlatList keyExtractor={keyExtractor} data={percentages} renderItem={(info) => renderItem(info.item)} />
      </View>
    </>
  );
};

export default WeightPercentagesScreen;
