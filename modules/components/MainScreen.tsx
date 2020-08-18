/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, KeyboardAvoidingView, Pressable, Keyboard} from 'react-native';
import ConversionSelection from './ConversionSelection';

const MainScreen = () => {
  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'position'} contentContainerStyle={{flex: 1}}>
          <View style={{backgroundColor: 'orange', flex: 8}}></View>
          <ConversionSelection />
        </KeyboardAvoidingView>
      </Pressable>
    </>
  );
};

export default MainScreen;
