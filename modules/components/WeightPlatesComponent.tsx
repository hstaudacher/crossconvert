/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Plate, PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';

interface WeightPlatesComponentProperties {
  plateDistribution: PlateDistribution;
}

const getPlateColor = (plate: Plate): string => {
  switch (plate) {
    case Plate.RED:
    case Plate.FRACTIONAL_RED:
      return '#af2e33';
    case Plate.BLUE:
    case Plate.FRACTIONAL_BLUE:
      return '#33618f';
    case Plate.YELLOW:
    case Plate.FRACTIONAL_YELLOW:
      return '#e8ae28';
    case Plate.GREEN:
    case Plate.FRACTIONAL_GREEN:
      return '#36aa40';
    default:
      return '#d7d7d7';
  }
};

const getPlateFontSize = (plate: Plate): number => {
  switch (plate) {
    case Plate.RED:
    case Plate.BLUE:
    case Plate.YELLOW:
    case Plate.GREEN:
      return 38;
    case Plate.WHITE:
      return 33;
    case Plate.FRACTIONAL_WHITE:
      return 24;
    default:
      return 28;
  }
};

const WeightPlatesComponent = (props: WeightPlatesComponentProperties) => {
  const plateGroups: PlateGroup[] = props.plateDistribution.getPlateGroups();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}>
        {plateGroups.map((group, index) => (
          <View
            key={index.toString()}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginLeft: 3,
            }}>
            <Icon
              name={'plate'}
              type={'crossfit'}
              color={getPlateColor(group.plate)}
              size={getPlateFontSize(group.plate)}
              containerStyle={{alignSelf: 'flex-end'}}
              reverse={false}
            />
            <Badge
              value={group.amount}
              containerStyle={{position: 'absolute', bottom: -3, left: -3}}
              badgeStyle={{backgroundColor: 'slategray'}}
            />
          </View>
        ))}
      </View>
    </>
  );
};

export default WeightPlatesComponent;
