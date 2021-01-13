/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';

interface WeightPercentagesSettingsScreenProperties extends NavigationComponentProps {}

const WeightPercentagesSettingsScreen = (props: WeightPercentagesSettingsScreenProperties) => {
  return (
    <>
      <Text>foo</Text>
    </>
  );
};

WeightPercentagesSettingsScreen.options = {
  topBar: {
    title: {
      text: 'Weight Settings',
      color: 'tomato',
    },
  },
};

export default WeightPercentagesSettingsScreen;
