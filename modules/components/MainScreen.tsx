/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard} from 'react-native';
import ConversionConfigurationView from './ConversionConfigurationView';
import ConversionConfiguration from './ConversionConfiguration';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitSelection';
import {fromOptions} from './options/FromOptions';
import {Divider} from 'react-native-elements';
import {NavigationComponentProps, NavigationFunctionComponent} from 'react-native-navigation';
import verticalOffset from './VerticalOffset';

const MainScreen: NavigationFunctionComponent = (props: NavigationComponentProps) => {
  const defaultUnit = units[0].title;
  const [configuration, changeConfiguration] = React.useState(
    new ConversionConfiguration(defaultUnit, '0', fromOptions(defaultUnit)[0]),
  );

  const [offset, changeVerticalOffset] = React.useState(verticalOffset.getOffset());
  verticalOffset.addSubscriber(changeVerticalOffset);

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="position"
          keyboardVerticalOffset={offset}
          contentContainerStyle={{flex: 1}}>
          <ConversionResultView configuration={configuration} componentId={props.componentId} />
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

MainScreen.options = {
  topBar: {
    title: {
      text: '3,2,1...GO',
    },
    backButton: {
      visible: false,
    },
  },
};

export default MainScreen;
