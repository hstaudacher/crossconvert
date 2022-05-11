import React, {useEffect, useState} from 'react';
import {Appearance, EmitterSubscription, Image, ImageSourcePropType} from 'react-native';

const HwpoIcon = () => {
  const [icon, setIcon] = useState<ImageSourcePropType>(require('./hwpo-white.png'));

  useEffect(() => {
    const changeIcon = (colorScheme: string | null | undefined) => {
      if (colorScheme === 'dark') {
        setIcon(require('./hwpo-white.png'));
      } else {
        setIcon(require('./hwpo-gold.png'));
      }
    };

    const colorScheme = Appearance.getColorScheme();
    changeIcon(colorScheme);

    const listener: Appearance.AppearanceListener = preferences => {
      changeIcon(preferences.colorScheme);
    };

    const subscription: EmitterSubscription = (Appearance.addChangeListener(
      listener,
    ) as unknown) as EmitterSubscription;
    return () => subscription.remove();
  }, [setIcon]);

  return (
    <>
      <Image style={{height: 36}} source={icon} resizeMode="contain" />
    </>
  );
};

export default HwpoIcon;
