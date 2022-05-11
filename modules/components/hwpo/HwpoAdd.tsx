import React, {useEffect, useState} from 'react';
import {Image, ImageSourcePropType, Linking, TouchableHighlight, View} from 'react-native';

const HwpoAdd = () => {
  const [ad, setAd] = useState<ImageSourcePropType>(require('./hwpo-ad-1.jpg'));

  const getRandomInt = (minInclusive: number, maxExclusive: number) => {
    const ceiledMin = Math.ceil(minInclusive);
    const ceiledMax = Math.floor(maxExclusive);
    return Math.floor(Math.random() * (ceiledMax - ceiledMin) + ceiledMin);
  };

  useEffect(() => {
    switch (getRandomInt(1, 4)) {
      case 1:
        setAd(require('./hwpo-ad-1.jpg'));
        break;
      case 2:
        setAd(require('./hwpo-ad-2.jpg'));
        break;
      case 3:
        setAd(require('./hwpo-ad-3.jpg'));
        break;
      default:
        setAd(require('./hwpo-ad-1.jpg'));
        break;
    }
  }, [setAd]);

  return (
    <>
      <View style={{borderTopColor: '#AE986B', borderTopWidth: 1, height: 100, padding: 0}}>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.hwpotraining.com/')}>
          <Image style={{width: '100%', height: '100%'}} resizeMode="cover" source={ad} />
        </TouchableHighlight>
      </View>
    </>
  );
};

export default HwpoAdd;
