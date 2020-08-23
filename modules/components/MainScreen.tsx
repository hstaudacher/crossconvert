/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard} from 'react-native';
import ConversionConfigurationView from './ConversionConfigurationView';
import ConversionConfiguration from './ConversionConfiguration';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitSelection';
import {fromOptions} from './options/FromOptions';
import {Header, Icon, Divider} from 'react-native-elements';

const MainScreen = () => {
  const defaultUnit = units[0].title;
  const [configuration, changeConfiguration] = React.useState(
    new ConversionConfiguration(defaultUnit, '0', fromOptions(defaultUnit)[0]),
  );

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'position'} contentContainerStyle={{flex: 1}}>
          <Header
            rightComponent={<Icon name={'menu'} color={'tomato'} />}
            leftComponent={{text: '3,2,1...GO', style: {color: 'tomato'}}}
            backgroundColor={'#fff'}
          />
          <Divider />
          <ConversionResultView configuration={configuration} />
          <Divider />
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
