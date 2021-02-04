/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Icon, Badge, Tooltip, Text} from 'react-native-elements';
import {getPlateColor, getPlateFontSize} from './weight/PlateVisualization';
import WeightUnit from '../conversion/WeightUnit';
import {PlateMapping} from './settings/Plates';

interface WeightPlatesComponentProperties {
  plateDistribution: PlateDistribution;
}

const WeightPlatesComponent = (props: WeightPlatesComponentProperties) => {
  const plateGroups: PlateGroup[] = props.plateDistribution.getPlateGroups();

  const getWeightText = (mapping: PlateMapping) => {
    if (props.plateDistribution.unit === WeightUnit.kg) {
      return mapping.kg + 'kg';
    }
    return mapping.lbs + 'lbs';
  };

  // TODO: fix tooltip
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
            <Tooltip popover={<Text>{getWeightText(group.mapping)}</Text>}>
              <Icon
                name={'plate'}
                type={'crossfit'}
                color={getPlateColor(group.mapping.plate)}
                size={getPlateFontSize(group.mapping.plate)}
                containerStyle={{alignSelf: 'flex-end'}}
                reverse={false}
              />
            </Tooltip>
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
