/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {PlateDistribution, PlateGroup} from './weight/PlateDistributor';
import {Pressable, View} from 'react-native';
import {Badge, Overlay, Text} from 'react-native-elements';
import {renderPlateIcon} from './weight/PlateVisualization';
import {PlateMapping} from './settings/Plates';
import WeightUnit from '../conversion/WeightUnit';

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

  const [legendVisible, setLegendVisible] = useState(false);

  const toggleLegend = () => {
    setLegendVisible(!legendVisible);
  };

  return (
    <>
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}
        onPress={toggleLegend}>
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
      </Pressable>
      <Overlay isVisible={legendVisible} onBackdropPress={toggleLegend} overlayStyle={{borderRadius: 5}}>
        <View style={{paddingTop: 10}}>
          {plateGroups.map((group) => (
            <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10, marginHorizontal: 10}}>
              {renderPlateIcon(group.mapping.plate, {alignSelf: 'center'})}
              <Text h4 style={{alignSelf: 'center', marginLeft: 8, color: 'tomato'}}>
                {group.amount}x{' '}
              </Text>
              <Text h4 style={{alignSelf: 'center'}}>
                {getWeightText(group.mapping)}
              </Text>
            </View>
          ))}
        </View>
      </Overlay>
    </>
  );
};

export default WeightPlatesComponent;
