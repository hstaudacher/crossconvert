/* eslint-disable react-native/no-inline-styles */
import {WeightUnit} from '../conversion';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Icon, ListItem, Overlay, Text} from 'react-native-elements';
import {PlateMapping} from './settings/Plates';
import {WeightSettings} from './store/WeightSettingsStore';
import {PlateDistribution, PlateDistributor} from './weight/PlateDistributor';
import {renderPlateIcon} from './weight/PlateVisualization';
import {WeightPercentage} from './weight/WeightPercentager';
import WeightPlatesComponent from './WeightPlatesComponent';
import DefaultStyle from './DefaultStyle';

interface WeightPercentageListItemProperties {
  percentage: WeightPercentage;
  settings: WeightSettings;
  displayInConversion: boolean;
}

const formatUnit = (unit: WeightUnit): string => {
  return unit === WeightUnit.kg ? 'kg' : 'lb';
};

const getWeightText = (mapping: PlateMapping, unit: WeightUnit) => {
  if (unit === WeightUnit.kg) {
    return mapping.kg + 'kg';
  }
  return mapping.lb + 'lb';
};

const WeightPercentagesListItem = (props: WeightPercentageListItemProperties) => {
  const [legendVisible, setLegendVisible] = useState(false);

  const [distribution, setDistribution] = useState(new PlateDistribution([], WeightUnit.kg));

  const toggleLegend = (percentage: WeightPercentage) => {
    setDistribution(getPlates(percentage.conversion.fromWeight, percentage.conversion.fromUnit));
    let barWeight = props.settings.bar.kg;
    if (percentage.conversion.fromUnit === WeightUnit.lb) {
      barWeight = props.settings.bar.lb;
    }
    if (barWeight < percentage.conversion.fromWeight) {
      setLegendVisible(!legendVisible);
    }
  };

  const getPlates = (weight: number, unit: WeightUnit): PlateDistribution => {
    const distributor = new PlateDistributor(props.settings, unit);
    return distributor.getPlateDistribution(weight);
  };

  const renderCantDistribute = () => {
    if (!distribution.completelyDistributed) {
      return (
        <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}} key={'na'}>
          <Icon
            key={'na'}
            name={'exclamation-triangle'}
            type={'font-awesome'}
            color={DefaultStyle.baseColor}
            size={25}
            containerStyle={{alignSelf: 'flex-end', width: 40}}
            reverse={false}
          />
          <Text h4 style={{alignSelf: 'center', marginLeft: 8, color: DefaultStyle.baseColor}}>
            not enough plates
          </Text>
        </View>
      );
    }
  };

  const renderBar = () => {
    let barText = props.settings.bar.kg + 'kg';
    if (props.percentage.conversion.fromUnit === WeightUnit.lb) {
      barText = props.settings.bar.lb + 'lb';
    }
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}} key={'bar'}>
        <Icon
          key={'bar'}
          name={'barbell'}
          type={'crossfit'}
          color={DefaultStyle.barColor}
          size={35}
          containerStyle={{alignSelf: 'flex-end', width: 40}}
          reverse={false}
        />
        <Text h4 style={{alignSelf: 'center', marginLeft: 8}}>
          {barText}
        </Text>
      </View>
    );
  };

  const renderText = () => {
    if (props.displayInConversion) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
          <Icon
            name={'barbell'}
            type={'crossfit'}
            color={DefaultStyle.barColor}
            size={36}
            iconProps={{name: 'barbell', size: 40}}
          />
          <Text style={{fontSize: 25, color: DefaultStyle.barColor, marginLeft: 23}}>
            {props.percentage.conversion.toWeight}
            {formatUnit(props.percentage.conversion.toUnit)}
          </Text>
        </View>
      );
    }
    return <Text style={{fontSize: 25, color: DefaultStyle.baseColor}}>{props.percentage.percentage}%</Text>;
  };

  const renderTitle = () => {
    if (!props.displayInConversion) {
      return (
        <ListItem.Title style={{fontSize: 25, opacity: 0.9}}>
          <Text>
            {props.percentage.conversion.fromWeight}
            {formatUnit(props.percentage.conversion.fromUnit)}
          </Text>
          <Text style={{fontSize: 20, opacity: 0.6}}> / </Text>
          <Text style={{fontSize: 20, opacity: 0.6}}>
            {props.percentage.conversion.toWeight}
            {formatUnit(props.percentage.conversion.toUnit)}
          </Text>
        </ListItem.Title>
      );
    }
  };

  const getMaxPlateGroups = () => {
    if (props.displayInConversion) {
      return 3;
    }
    return undefined;
  };

  return (
    <>
      <ListItem bottomDivider onPress={() => toggleLegend(props.percentage)}>
        {renderText()}
        <ListItem.Content style={{alignItems: 'flex-end'}}>
          {renderTitle()}
          <ListItem.Subtitle style={{opacity: 0.9, marginTop: 4}}>
            <View>
              <WeightPlatesComponent
                plateDistribution={getPlates(
                  props.percentage.conversion.fromWeight,
                  props.percentage.conversion.fromUnit,
                )}
                maxPlateGroups={getMaxPlateGroups()}
              />
            </View>
          </ListItem.Subtitle>
          <Overlay
            isVisible={legendVisible}
            onBackdropPress={() => toggleLegend(props.percentage)}
            overlayStyle={{borderRadius: 5}}>
            <View style={{paddingTop: 10}}>
              {renderCantDistribute()}
              {renderBar()}
              {distribution.getPlateGroups().map((group) => (
                <View
                  style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}}
                  key={group.mapping.plate.toString()}>
                  {renderPlateIcon(group.mapping.plate, {alignSelf: 'flex-end', width: 40})}
                  <Text h4 style={{alignSelf: 'center', marginLeft: 8, color: DefaultStyle.baseColor}}>
                    {group.amount}x{' '}
                  </Text>
                  <Text h4 style={{alignSelf: 'center'}}>
                    {getWeightText(group.mapping, props.percentage.conversion.fromUnit)}
                  </Text>
                </View>
              ))}
            </View>
          </Overlay>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default WeightPercentagesListItem;
