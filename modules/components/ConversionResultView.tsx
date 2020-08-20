/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';

interface ConversionResultViewProperties {
  configuration: ConversionConfiguration;
}

const ConversionResultView = (props: ConversionResultViewProperties) => {
  return (
    <>
      <View style={{backgroundColor: 'orange', flex: 8}}>
        <View style={{flex: 1, margin: 40}}>
          <Text>{props.configuration.unit}</Text>
          <Text>{props.configuration.value}</Text>
          <Text>{props.configuration.from.title}</Text>
        </View>
      </View>
    </>
  );
};

export default ConversionResultView;
