import React from 'react';
import {Image, Linking, TouchableHighlight, View} from 'react-native';

const HwpoAdd = () => {
  return (
    <>
      <View style={{borderTopColor: '#AE986B', borderTopWidth: 1}}>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.hwpotraining.com/')}>
          <Image style={{height: 100, width: 400}} source={require('./ad.png')} resizeMode="cover" />
        </TouchableHighlight>
      </View>
    </>
  );
};

export default HwpoAdd;
