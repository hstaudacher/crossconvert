/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import ConversionConfiguration from './ConversionConfiguration';
import {WeightPercentager, WeightPercentage} from './options/WeightPercentager';

interface WeightDetailsScreenProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const WeightPercentagesScreen = (props: WeightDetailsScreenProperties) => {
  const percentager: WeightPercentager = new WeightPercentager(props.configuration);
  const percentages: WeightPercentage[] = percentager.getPercentages();

  return (
    <>
      <View>
        {percentages.map((p: WeightPercentage, index: number) => (
          <Text key={index}>{JSON.stringify(p)}</Text>
        ))}
      </View>
    </>
  );
};

export default WeightPercentagesScreen;
