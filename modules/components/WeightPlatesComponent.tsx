/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {View} from 'react-native';
import {Badge, Icon} from 'react-native-elements';
import {renderPlateIcon} from './weight/PlateVisualization';
import DefaultStyle from './DefaultStyle';

interface WeightPlatesComponentProperties {
  plateDistribution: PlateDistribution;
  maxPlateGroups?: number;
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
            color={DefaultStyle.weigthCantDistributeColor}
            size={25}
            containerStyle={{alignSelf: 'center', marginRight: 20}}
            reverse={false}
          />
        </View>
      );
    }
  };

  const maxPlateGroups = () => {
    if (props.maxPlateGroups !== undefined) {
      return props.maxPlateGroups;
    }
    if (props.plateDistribution.completelyDistributed) {
      return 5;
    }
    return 4;
  };

  const renderDots = () => {
    if (plateGroups.length >= maxPlateGroups()) {
      return (
        <View style={{alignSelf: 'flex-end', marginLeft: 10}}>
          <Icon type="ionicon" name="ellipsis-horizontal-outline" color={DefaultStyle.baseColor} />
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
        {plateGroups.slice(0, maxPlateGroups()).map((group, index) => (
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
        {renderDots()}
      </View>
    </>
  );
};

export default WeightPlatesComponent;
