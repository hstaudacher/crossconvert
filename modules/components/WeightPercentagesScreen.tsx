/* eslint-disable react-native/no-inline-styles */
import {WeightUnit} from '../conversion';
import React from 'react';
import {Text, View, FlatList, ListRenderItemInfo} from 'react-native';
import {ListItem} from 'react-native-elements';
import {NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager, WeightPercentage} from './options/WeightPercentager';

interface WeightDetailsScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const formatUnit = (unit: WeightUnit): string => {
  return unit === WeightUnit.kg ? 'kg' : 'lbs';
};

const renderItem = (percentage: WeightPercentage) => {
  return (
    <>
      <ListItem bottomDivider>
        <Text style={{fontSize: 30, color: 'tomato'}}>{percentage.percentage}%</Text>
        <ListItem.Content style={{alignItems: 'flex-end'}}>
          <ListItem.Title style={{fontSize: 25}}>
            {percentage.conversion.fromWeight} {formatUnit(percentage.conversion.fromUnit)}
          </ListItem.Title>
          <ListItem.Subtitle>
            {percentage.conversion.toWeight} {formatUnit(percentage.conversion.toUnit)}
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
  const percentager: WeightPercentager = new WeightPercentager(props.configuration);
  const percentages: WeightPercentage[] = percentager.getPercentages(120, 50);

  return (
    <>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={percentages}
          renderItem={(info: ListRenderItemInfo<WeightPercentage>) => {
            return renderItem(info.item);
          }}
        />
      </View>
    </>
  );
};

export default WeightPercentagesScreen;
