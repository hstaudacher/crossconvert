/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Keyboard, TouchableOpacity, StyleSheet, Platform, StyleProp} from 'react-native';
import {Input, Text, Overlay, Icon} from 'react-native-elements';

import ConversionConfiguration from './ConversionConfiguration';
import {FromSelection} from './FromSelection';
import {UnitSelection} from './UnitSelection';
import {fromOptions} from './options/FromOptions';
import {FromOption} from './options/FromOption';
import DefaultStyle from './DefaultStyle';

export interface ConversionConfigurationViewProperties {
  configuration: ConversionConfiguration;
  changeConfiguration: (context: ConversionConfiguration) => void;
}

const ConversionConfigurationView = (props: ConversionConfigurationViewProperties) => {
  const [unitSelectionVisible, setUnitSelectionVisible] = React.useState(false);
  const [fromSelectionVisible, setFromSelectionVisible] = React.useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    const didShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const didHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      didShowListener.remove();
      didHideListener.remove();
    };
  });

  const containerStyleAllOs = () => {
    return StyleSheet.create({
      containerStyle: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: Platform.OS === 'ios' ? -10 : 0,
        paddingTop: 10,
        paddingLeft: 12,
        borderTopColor: props.configuration.from.color,
        borderTopWidth: 1,
      },
    });
  };

  const containerStyleAndroid = StyleSheet.create({
    containerStyle: {
      marginTop: -30,
    },
  });

  const [containerStyle, setContainerStyle] = useState(containerStyleAllOs().containerStyle);

  const keyboardDidShow = () => {
    if (Platform.OS !== 'ios') {
      const composedStyle: StyleProp<any> = StyleSheet.compose(
        containerStyleAllOs().containerStyle,
        containerStyleAndroid.containerStyle,
      );
      setContainerStyle(composedStyle);
    }
  };
  const keyboardDidHide = () => {
    setContainerStyle(containerStyleAllOs().containerStyle);
  };

  const onFromOptionClick = (option: FromOption): void => {
    props.configuration.from = option;
    fireConfigurationChange();
    toggleFromSelectionOverlay();
  };

  const toggleFromSelectionOverlay = (): void => {
    Keyboard.dismiss();
    if (fromOptions(props.configuration.unit).length > 1) {
      setFromSelectionVisible(!fromSelectionVisible);
    }
  };

  const updateUnit = (newUnit: string): void => {
    ensureFromOptionExists(newUnit);
    props.configuration.unit = newUnit;
    fireConfigurationChange();
    toggleUnitSelectionOverlay();
  };

  const ensureFromOptionExists = (newUnit: string): void => {
    const options = fromOptions(newUnit);
    const indexOfFrom = options.findIndex((i: any) => i.title === props.configuration.from.title);
    if (indexOfFrom === -1) {
      props.configuration.from = options[0];
      fireConfigurationChange();
    }
  };

  const toggleUnitSelectionOverlay = (): void => {
    Keyboard.dismiss();
    setUnitSelectionVisible(!unitSelectionVisible);
  };

  const changeValue = (newValue: string): void => {
    if (newValue.length < 5) {
      const toConvert = newValue.replace(/[^0-9.,]/g, '').replace(',', '.');
      props.configuration.value = toConvert;
      setValue(toConvert);
      fireConfigurationChange();
    }
  };

  const fireConfigurationChange = (): void => {
    props.changeConfiguration(props.configuration.copy());
    setContainerStyle(containerStyleAllOs().containerStyle);
  };

  const overlayStyle = StyleSheet.create({
    overlayStyle: {
      borderTopColor: props.configuration.from.color,
      borderTopWidth: 1,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
  });

  const computeInputStyle = () => {
    if (Platform.OS === 'ios') {
      return {fontSize: 28};
    }
    return {fontSize: 28, paddingBottom: 3};
  };

  return (
    <>
      <View style={containerStyle}>
        <View style={styles.innerContainer}>
          <Input
            placeholder="0"
            rightIcon={
              <TouchableOpacity onPress={toggleUnitSelectionOverlay}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text
                    style={{color: DefaultStyle.baseColor, marginBottom: 0, height: 40}}
                    h3
                    h3Style={{fontWeight: 'normal'}}>
                    {props.configuration.unit}
                  </Text>
                  <Icon
                    type="ionicon"
                    name="chevron-down-outline"
                    color={DefaultStyle.baseColor}
                    size={20}
                    style={{paddingTop: 8}}
                  />
                </View>
              </TouchableOpacity>
            }
            rightIconContainerStyle={{height: 20}}
            keyboardType="numeric"
            onChangeText={changeValue}
            value={value}
            inputStyle={computeInputStyle()}
          />
        </View>

        <View style={{flex: 2, paddingBottom: 12, marginLeft: 20}}>
          <Icon
            key={props.configuration.unit}
            type={props.configuration.from.type}
            name={props.configuration.from.icon}
            onPress={toggleFromSelectionOverlay}
            reverse={true}
            color={props.configuration.from.color}
            size={25}
            iconProps={{name: props.configuration.from.icon, size: props.configuration.from.selectionIconSize}}
          />
        </View>
      </View>

      <Overlay
        isVisible={fromSelectionVisible}
        onBackdropPress={toggleFromSelectionOverlay}
        animationType="slide"
        overlayStyle={overlayStyle.overlayStyle}
        backdropStyle={{opacity: 0}}>
        <FromSelection handleClick={onFromOptionClick} unit={props.configuration.unit} filter={fromOptions} />
      </Overlay>

      <Overlay
        isVisible={unitSelectionVisible}
        onBackdropPress={toggleUnitSelectionOverlay}
        animationType="slide"
        overlayStyle={overlayStyle.overlayStyle}
        backdropStyle={{opacity: 0}}>
        <UnitSelection handleClick={updateUnit} />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 6,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
});

export default ConversionConfigurationView;
