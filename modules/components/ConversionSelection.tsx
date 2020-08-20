/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableHighlight, Keyboard} from 'react-native';
import {Input, Text, Overlay, Icon} from 'react-native-elements';
import {ConvertDialog} from './ConvertDialog';
import {ConvertUiItem, filterFromItems} from './ConvertUiItems';
import {UnitDialog, units} from './UnitDialog';

const ConversionSelection = () => {
  const [value, onChangeValue] = React.useState('50');
  const [unit, setUnit] = React.useState(units[0].title);
  const [unitDialogVisible, setUnitDialogVisible] = React.useState(false);
  const [from, setFrom] = React.useState(filterFromItems(unit)[0]);
  const [fromDialogVisible, setFromDialogVisible] = React.useState(false);

  const fromItemClick = (item: ConvertUiItem): void => {
    setFrom(item);
    toggleFromDialogOverlay();
  };

  const toggleFromDialogOverlay = (): void => {
    Keyboard.dismiss();
    if (filterFromItems(unit).length > 1) {
      setFromDialogVisible(!fromDialogVisible);
    }
  };

  const updateUnit = (newUnit: string): void => {
    ensureFromExists(newUnit);
    setUnit(newUnit);
    toggleUnitDialogOverlay();
  };

  const ensureFromExists = (newUnit: string): void => {
    const items: Array<ConvertUiItem> = filterFromItems(newUnit);
    const indexOfFrom: number = items.findIndex((i) => i.title === from.title);
    if (indexOfFrom === -1) {
      setFrom(items[0]);
    }
  };

  const toggleUnitDialogOverlay = (): void => {
    Keyboard.dismiss();
    setUnitDialogVisible(!unitDialogVisible);
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
            placeholder={value}
            rightIcon={
              <TouchableHighlight onPress={toggleUnitDialogOverlay}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{color: 'tomato', marginBottom: 0, height: 40}} h4>
                    {unit}
                  </Text>
                  <Icon type="ionicon" name="chevron-down-outline" color="tomato" size={20} style={{paddingTop: 8}} />
                </View>
              </TouchableHighlight>
            }
            rightIconContainerStyle={{height: 20}}
            keyboardType="numeric"
            onChangeText={(text) => onChangeValue(text)}
            inputStyle={{fontSize: 28}}
          />
        </View>

        <View style={{flex: 2, paddingBottom: 12, marginLeft: 20}}>
          <Icon
            type={from.type}
            name={from.icon}
            onPress={toggleFromDialogOverlay}
            reverse={true}
            color={from.color}
            size={25}
          />
        </View>
      </View>

      <Overlay
        isVisible={fromDialogVisible}
        onBackdropPress={toggleFromDialogOverlay}
        animationType="slide"
        overlayStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        backdropStyle={{opacity: 0}}>
        <ConvertDialog handleClick={fromItemClick} unit={unit} filter={filterFromItems} />
      </Overlay>

      <Overlay
        isVisible={unitDialogVisible}
        onBackdropPress={toggleUnitDialogOverlay}
        animationType="slide"
        overlayStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}
        backdropStyle={{opacity: 0}}>
        <UnitDialog handleClick={updateUnit} />
      </Overlay>
    </>
  );
};

export default ConversionSelection;
