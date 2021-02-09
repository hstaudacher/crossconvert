/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Badge, Icon, Text} from 'react-native-elements';
import {renderPlateIcon} from './weight/PlateVisualization';

interface WeightPlatesComponentProperties {
  plateDistribution: PlateDistribution;
}

const WeightPlatesComponent = (props: WeightPlatesComponentProperties) => {
  const plateGroups: PlateGroup[] = props.plateDistribution.getPlateGroups();

  const renderCantDistribute = () => {
    if (!props.plateDistribution.completelyDistributed) {
      return (
        <View
          key={'na'}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginLeft: 3,
          }}>
          <Icon
            key={'na'}
            name={'exclamation-triangle'}
            type={'font-awesome'}
            color={'tomato'}
            size={25}
            containerStyle={{alignSelf: 'center', marginRight: 20}}
            reverse={false}
          />
        </View>
      );
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}>
        {renderCantDistribute()}
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
