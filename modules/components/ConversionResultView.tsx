import React from 'react';
import {View, Text} from 'react-native';
import {ConversionProperties} from './ConversionContext';

const ConversionResultView = (props: ConversionProperties) => {
  return (
    <>
      <View style={{backgroundColor: 'orange', flex: 8}}>
        <View style={{flex: 1, margin: 40}}>
          <Text>{props.context.unit}</Text>
          <Text>{props.context.value}</Text>
          <Text>{props.context.from.title}</Text>
        </View>
      </View>
    </>
  );
};

export default ConversionResultView;
