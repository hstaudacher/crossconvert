/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard, View} from 'react-native';
import ConversionConfigurationView from './ConversionConfigurationView';
import ConversionConfiguration from './ConversionConfiguration';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitSelection';
import {fromOptions} from './options/FromOptions';
import {Navigation, NavigationComponentProps, NavigationFunctionComponent} from 'react-native-navigation';

const MainScreen: NavigationFunctionComponent = (props: NavigationComponentProps) => {
  const defaultUnit = units[0].title;
  const [configuration, changeConfiguration] = React.useState(
    new ConversionConfiguration(defaultUnit, '0', fromOptions(defaultUnit)[0]),
  );

  const [verticalOffset, changeVerticalOffset] = React.useState(80);

  useEffect(() => {
    let isMounted = true;
    Navigation.constants().then((constants) => {
      if (isMounted) {
        changeVerticalOffset(constants.topBarHeight + constants.statusBarHeight);
      }
    });
    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <ConversionResultView configuration={configuration} componentId={props.componentId} />
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="position"
            keyboardVerticalOffset={verticalOffset - 20}
            contentContainerStyle={{flex: 1}}>
            <ConversionConfigurationView
              configuration={configuration}
              changeConfiguration={(c) => changeConfiguration(c)}
            />
          </KeyboardAvoidingView>
        </View>
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
