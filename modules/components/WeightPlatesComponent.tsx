/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Badge} from 'react-native-elements';
import {renderPlateIcon} from './weight/PlateVisualization';

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
            {renderPlateIcon(group.mapping.plate, {alignSelf: 'flex-end'})}
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
