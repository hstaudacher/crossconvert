/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Input, Text, Overlay, Icon} from 'react-native-elements';
import {ConvertDialog} from './ConvertDialog';
import {ConvertUiItem} from './ConvertUiItems';

const ConversionSelection = () => {
  const [value, onChangeText] = React.useState('500');
  const [visible, setVisible] = React.useState(false);
  const [unit, setUnit] = React.useState('cals');

  const toggleOverlay = (): void => {
    setVisible(!visible);
  };

  const itemClick = (item: ConvertUiItem): void => {
    console.log(item.title);
    toggleOverlay();
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
              <TouchableHighlight onPress={toggleOverlay}>
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
            onChangeText={(text) => onChangeText(text)}
            inputStyle={{fontSize: 28}}
          />
        </View>

        <View style={{flex: 2, paddingBottom: 18, marginLeft: 10}}>
          <Icon type="material" name="rowing" onPress={toggleOverlay} reverse={true} color="tomato" size={20} />
        </View>

        <Text style={{flex: 1, marginBottom: 31}} h4>
          to
        </Text>
        <View style={{flex: 2, paddingBottom: 18}}>
          <Icon type="material" name="rowing" onPress={toggleOverlay} reverse={true} color="tomato" size={20} />
        </View>
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        animationType="slide"
        overlayStyle={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <ConvertDialog handleClick={itemClick} />
      </Overlay>
    </>
  );
};

export default ConversionSelection;
