/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {getPlateColor, getPlateFontSize} from './weight/PlateVisualization';

interface WeightPlatesComponentProperties {
  plateDistribution: PlateDistribution;
}

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
