/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard} from 'react-native';
import ConversionConfigurationView from './ConversionConfigurationView';
import ConversionConfiguration from './ConversionConfiguration';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitSelection';
import {fromOptions} from './FromOptions';

const MainScreen = () => {
  const defaultUnit = units[0].title;
  const [configuration, changeConfiguration] = React.useState(
    new ConversionConfiguration(defaultUnit, '50', fromOptions(defaultUnit)[0]),
  );

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'position'} contentContainerStyle={{flex: 1}}>
          <ConversionResultView configuration={configuration} />
          <ConversionConfigurationView
            configuration={configuration}
            changeConfiguration={(c) => changeConfiguration(c)}
          />
        </KeyboardAvoidingView>
      </Pressable>
    </>
  );
};

export default MainScreen;
