/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';

interface WeightPercentageSettingsScreenProperties extends NavigationComponentProps {}

const WeightPercentageSettingsScreen = (props: WeightPercentageSettingsScreenProperties) => {
  return (
    <>
      <Text>foo</Text>
    </>
  );
};

WeightPercentageSettingsScreen.options = {
  topBar: {
    title: {
      text: 'Weight Settings',
      color: 'tomato',
    },
  },
};

export default WeightPercentageSettingsScreen;
