/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Keyboard} from 'react-native';
import {Input, Icon} from 'react-native-elements';

export interface WeightPercentagesAddViewProperties {
  addPercentageCallback: Function;
}

const WeightPercentagesAddView = (props: WeightPercentagesAddViewProperties) => {
  const [percentage, setPercentage] = useState('');

  const updatePercentage = (newValue: string) => {
    setPercentage(newValue.replace(/[^0-9]/g, ''));
  };

  const addPercentage = () => {
    Keyboard.dismiss();
    props.addPercentageCallback(percentage);
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
          marginBottom: 15,
          marginLeft: 12,
        }}>
        <View style={{flex: 6}}>
          <Input
            placeholder={''}
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
            color={'green'}
            size={25}
            iconProps={{name: 'add-outline', size: 41}}
          />
        </View>
      </View>
    </>
  );
};

export default WeightPercentagesAddView;
