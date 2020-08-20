/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableHighlight, Keyboard} from 'react-native';
import {Input, Text, Overlay, Icon} from 'react-native-elements';
import {ConvertDialog} from './ConvertDialog';
import {ConvertUiItem, filterFromItems} from './ConvertUiItems';
import {UnitDialog} from './UnitDialog';
import {ConversionProperties} from './ConversionContext';

const ConversionSelection = (props: ConversionProperties) => {
  const context = props.context;
  const [unitDialogVisible, setUnitDialogVisible] = React.useState(false);
  const [fromDialogVisible, setFromDialogVisible] = React.useState(false);

  const fromItemClick = (item: ConvertUiItem): void => {
    props.changeContext(context.copyWithFrom(item));
    toggleFromDialogOverlay();
  };

  const toggleFromDialogOverlay = (): void => {
    Keyboard.dismiss();
    if (filterFromItems(context.unit).length > 1) {
      setFromDialogVisible(!fromDialogVisible);
    }
  };

  const updateUnit = (newUnit: string): void => {
    ensureFromExists(newUnit);
    props.changeContext(context.copyWithUnit(newUnit));
    toggleUnitDialogOverlay();
  };

  const ensureFromExists = (newUnit: string): void => {
    const items: Array<ConvertUiItem> = filterFromItems(newUnit);
    const indexOfFrom: number = items.findIndex((i) => i.title === context.from.title);
    if (indexOfFrom === -1) {
      props.changeContext(context.copyWithFrom(items[0]));
    }
  };

  const toggleUnitDialogOverlay = (): void => {
    Keyboard.dismiss();
    setUnitDialogVisible(!unitDialogVisible);
  };

  const changeValue = (newValue: string) => {
    props.changeContext(context.copyWithValue(newValue));
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
            placeholder={context.value}
            rightIcon={
              <TouchableHighlight onPress={toggleUnitDialogOverlay}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{color: 'tomato', marginBottom: 0, height: 40}} h4>
                    {context.unit}
                  </Text>
                  <Icon type="ionicon" name="chevron-down-outline" color="tomato" size={20} style={{paddingTop: 8}} />
                </View>
              </TouchableHighlight>
            }
            rightIconContainerStyle={{height: 20}}
            keyboardType="numeric"
            onChangeText={(text) => changeValue(text)}
            inputStyle={{fontSize: 28}}
          />
        </View>

        <View style={{flex: 2, paddingBottom: 12, marginLeft: 20}}>
          <Icon
            type={context.from.type}
            name={context.from.icon}
            onPress={toggleFromDialogOverlay}
            reverse={true}
            color={context.from.color}
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
        <ConvertDialog handleClick={fromItemClick} unit={context.unit} filter={filterFromItems} />
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
