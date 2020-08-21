/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableHighlight, Keyboard} from 'react-native';
import {Input, Text, Overlay, Icon} from 'react-native-elements';

import ConversionConfiguration from './ConversionConfiguration';
import {FromSelection} from './FromSelection';
import {UnitSelection} from './UnitSelection';
import {FromOption, fromOptions} from './FromOptions';

export interface ConversionConfigurationViewProperties {
  configuration: ConversionConfiguration;
  changeConfiguration: (context: ConversionConfiguration) => void;
}

const ConversionConfigurationView = (props: ConversionConfigurationViewProperties) => {
  const [unitSelectionVisible, setUnitSelectionVisible] = React.useState(false);
  const [fromSelectionVisible, setFromSelectionVisible] = React.useState(false);

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
    const options: Array<FromOption> = fromOptions(newUnit);
    const indexOfFrom: number = options.findIndex((i) => i.title === props.configuration.from.title);
    if (indexOfFrom === -1) {
      props.configuration.from = options[0];
      fireConfigurationChange();
    }
  };

  const toggleUnitSelectionOverlay = (): void => {
    Keyboard.dismiss();
    setUnitSelectionVisible(!unitSelectionVisible);
  };

  const changeValue = (value: string): void => {
    props.configuration.value = value;
    fireConfigurationChange();
  };

  const fireConfigurationChange = (): void => {
    props.changeConfiguration(props.configuration.copy());
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          marginBottom: 25,
          marginLeft: 12,
        }}>
        <View style={{flex: 6}}>
          <Input
            placeholder={props.configuration.value}
            rightIcon={
              <TouchableHighlight onPress={toggleUnitSelectionOverlay}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{color: 'tomato', marginBottom: 0, height: 40}} h4>
                    {props.configuration.unit}
                  </Text>
                  <Icon type="ionicon" name="chevron-down-outline" color="tomato" size={20} style={{paddingTop: 8}} />
                </View>
              </TouchableHighlight>
            }
            rightIconContainerStyle={{height: 20}}
            keyboardType="numeric"
            onChangeText={changeValue}
            inputStyle={{fontSize: 28}}
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
          />
        </View>
      </View>

      <Overlay
        isVisible={fromSelectionVisible}
        onBackdropPress={toggleFromSelectionOverlay}
        animationType="slide"
        overlayStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        backdropStyle={{opacity: 0}}>
        <FromSelection handleClick={onFromOptionClick} unit={props.configuration.unit} filter={fromOptions} />
      </Overlay>

      <Overlay
        isVisible={unitSelectionVisible}
        onBackdropPress={toggleUnitSelectionOverlay}
        animationType="slide"
        overlayStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        backdropStyle={{opacity: 0}}>
        <UnitSelection handleClick={updateUnit} />
      </Overlay>
    </>
  );
};

export default ConversionConfigurationView;
