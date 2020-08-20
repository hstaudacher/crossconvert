/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard} from 'react-native';
import ConversionSelection from './ConversionSelection';
import {ConversionContext} from './ConversionContext';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitDialog';
import {filterFromItems} from './ConvertUiItems';

const MainScreen = () => {
  const defaultUnit = units[0].title;
  const [context, changeContext] = React.useState(
    new ConversionContext(defaultUnit, '50', filterFromItems(defaultUnit)[0]),
  );

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'position'} contentContainerStyle={{flex: 1}}>
          <ConversionResultView context={context} changeContext={() => null} />
          <ConversionSelection context={context} changeContext={(c) => changeContext(c)} />
        </KeyboardAvoidingView>
      </Pressable>
    </>
  );
};

export default MainScreen;
