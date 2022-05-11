/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {KeyboardAvoidingView, Pressable, Keyboard, View, Platform} from 'react-native';
import ConversionConfigurationView from './ConversionConfigurationView';
import ConversionConfiguration from './ConversionConfiguration';
import ConversionResultView from './ConversionResultView';
import {units} from './UnitSelection';
import {fromOptions} from './options/FromOptions';
import {Navigation, NavigationComponentProps, NavigationFunctionComponent} from 'react-native-navigation';
import DefaultStyle from './DefaultStyle';

const MainScreen: NavigationFunctionComponent = (props: NavigationComponentProps) => {
  const defaultUnit = units[0].title;
  const [configuration, changeConfiguration] = React.useState(
    new ConversionConfiguration(defaultUnit, '0', fromOptions(defaultUnit)[0]),
  );

  return (
    <>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <ConversionResultView configuration={configuration} componentId={props.componentId} />
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'position' : undefined}
            keyboardVerticalOffset={70}
            contentContainerStyle={{flex: 1}}>
            <ConversionConfigurationView
              configuration={configuration}
              changeConfiguration={(c: ConversionConfiguration) => changeConfiguration(c)}
            />
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </>
  );
};

MainScreen.options = (props: NavigationComponentProps) => {
  return {
    topBar: {
      title: {
        component: {
          name: 'HwpoIcon',
          height: 30,
        },
      },
      backButton: {
        visible: false,
      },
      rightButtons: [
        {
          id: 'settingsButton',
          text: '',
          showAsAction: 'always',
          component: {
            name: 'Icon',
            width: 50,
            passProps: {
              name: 'sliders',
              type: 'font-awesome',
              color: DefaultStyle.barButtonColor,
              onPress: () => {
                Navigation.push(props.componentId, {
                  component: {
                    name: 'Settings',
                    options: {
                      topBar: {
                        backButton: {
                          title: 'Back',
                        },
                      },
                    },
                  },
                });
              },
            },
          },
        },
      ],
    },
  };
};

export default MainScreen;
