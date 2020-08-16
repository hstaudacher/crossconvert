/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import ConversionSelection from './ConversionSelection';

const MainScreen = () => {
  return (
    <>
      <View style={{backgroundColor: 'orange', flex: 8}}></View>
      <ConversionSelection />
    </>
  );
};

export default MainScreen;
