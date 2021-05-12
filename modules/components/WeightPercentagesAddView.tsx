/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Keyboard, StyleSheet, Platform, StyleProp} from 'react-native';
import {Input, Icon} from 'react-native-elements';

export interface WeightPercentagesAddViewProperties {
  addPercentageCallback: Function;
}

const WeightPercentagesAddView = (props: WeightPercentagesAddViewProperties) => {
  const [percentage, setPercentage] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  });

  const containerStyleAllOs = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingLeft: 12,
      marginTop: -10,
      borderTopColor: '#36aa40',
      borderTopWidth: 1,
    },
  });

  const containerStyleAndroid = StyleSheet.create({
    containerStyle: {
      marginTop: -40,
    },
  });

  const [containerStyle, setContainerStyle] = useState(containerStyleAllOs.containerStyle);

  const keyboardDidShow = () => {
    if (Platform.OS !== 'ios') {
      const composedStyle: StyleProp<any> = StyleSheet.compose(
        containerStyleAllOs.containerStyle,
        containerStyleAndroid.containerStyle,
      );
      setContainerStyle(composedStyle);
    }
  };
  const keyboardDidHide = () => {
    setContainerStyle(containerStyleAllOs.containerStyle);
  };

  const updatePercentage = (newValue: string) => {
    if (newValue.length < 5) {
      setPercentage(newValue.replace(/[^0-9]/g, ''));
    }
  };

  const addPercentage = () => {
    if (percentage.length > 0) {
      Keyboard.dismiss();
      props.addPercentageCallback(percentage);
      updatePercentage('');
    }
  };

  return (
    <>
      <View style={containerStyle}>
        <View style={styles.innerContainer}>
          <Input
            placeholder={'%'}
            keyboardType="numeric"
            onChangeText={updatePercentage}
            value={percentage}
            inputStyle={{fontSize: 28}}
          />
        </View>

        <View style={{flex: 2, paddingBottom: 12, marginLeft: 10}}>
          <Icon
            key={'add'}
            type={'ionicon'}
            name={'add-outline'}
            onPress={addPercentage}
            reverse={true}
            color={'#36aa40'}
            size={25}
            iconProps={{name: 'add-outline', size: 41}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 6,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
});

export default WeightPercentagesAddView;
