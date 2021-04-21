/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {ListItem, Icon} from 'react-native-elements';
import {fromOptions} from './options/FromOptions';
import {ConversionResult, FromOption} from './options/FromOption';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import WeightPercentagesListItem from './WeightPercentagesListItem';
import {WeightPercentage, WeightPercentager} from './weight/WeightPercentager';
import {store} from './store/WeightSettingsStore';
import DefaultStyle from './DefaultStyle';
import Analytics from 'appcenter-analytics';
import {Plate} from './settings/Plates';
import {getPlateColor} from './weight/PlateVisualization';

class ConvertedOption {
  conversionResults: Array<ConversionResult>;
  constructor(readonly option: FromOption, readonly configuration: ConversionConfiguration) {
    this.conversionResults = option.convert(configuration);
  }

  isEmpty = (): boolean => {
    return this.conversionResults.length === 0;
  };
}

interface ConversionResultViewProperties extends NavigationComponentProps {
  configuration: ConversionConfiguration;
}

const ConversionResultView = (props: ConversionResultViewProperties) => {
  const [weigthSettings, setWeightSettings] = useState(store.getSettings());

  const renderWeightItem = (convertedOption: ConvertedOption) => {
    const percentager = new WeightPercentager(convertedOption.configuration);
    let percentage = percentager.getPercentages([100])[0];
    percentage = new WeightPercentage(percentage.percentage, percentage.conversion.onlyTo());
    return (
      <>
        <WeightPercentagesListItem percentage={percentage} settings={weigthSettings} displayInConversion={true} />
        <ListItem bottomDivider containerStyle={styles.container} onPress={() => onOptionPress(convertedOption)}>
          <View style={{flexDirection: 'row', width: 40, height: 40}}>
            <Icon
              name="plate"
              type="crossfit"
              color={getPlateColor(Plate.GREEN)}
              size={32}
              containerStyle={{position: 'absolute', left: 8, top: 0}}
              iconProps={{name: 'plate', size: 32}}
            />
            <Icon
              name="plate"
              type="crossfit"
              color={getPlateColor(Plate.BLUE)}
              size={32}
              containerStyle={{position: 'absolute', left: 5, top: 3}}
              iconProps={{name: 'plate', size: 32}}
            />
            <Icon
              name="plate"
              type="crossfit"
              color={getPlateColor(Plate.YELLOW)}
              size={32}
              containerStyle={{position: 'absolute', left: 2, top: 6}}
              iconProps={{name: 'plate', size: 32}}
            />
          </View>
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 25, color: '#33618f', marginLeft: 8}}>
              % of {convertedOption.configuration.value}
              {convertedOption.configuration.unit}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron style={{marginLeft: 10}} name="chevron-forward-outline" type="ionicon" />
        </ListItem>
      </>
    );
  };

  const onOptionPress = (convertedOption: ConvertedOption) => {
    if (isWeightConversion(convertedOption)) {
      Navigation.push(props.componentId, {
        component: {
          name: 'WeightPercentages',
          options: {
            topBar: {
              title: {
                text: convertedOption.configuration.value + convertedOption.configuration.unit,
              },
              backButton: {
                title: 'Back',
                color: DefaultStyle.baseColor,
              },
            },
          },
          passProps: {
            configuration: convertedOption.configuration,
            onSettingsUpdate: setWeightSettings,
          },
        },
      });
      Analytics.trackEvent('view-percentages');
    }
  };

  const renderConvertedItem = (convertedOption: ConvertedOption) => {
    return (
      <>
        <ListItem bottomDivider containerStyle={styles.container}>
          <Icon
            name={convertedOption.option.icon}
            type={convertedOption.option.type}
            color={convertedOption.option.color}
            size={36}
            iconProps={{name: convertedOption.option.icon, size: convertedOption.option.resultIconSize}}
          />
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 25, color: convertedOption.option.color, marginLeft: 6}}>
              {convertedOption.option.title}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subTitle}>
              {convertedOption.conversionResults.map((singelResult, j) => (
                <Text key={j}>
                  {renderSlash(j)}
                  {singelResult.value}
                  <Text style={styles.unitText}>{singelResult.unit}</Text>
                </Text>
              ))}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </>
    );
  };

  const renderItem = (convertedOption: ConvertedOption) => {
    if (isWeightConversion(convertedOption)) {
      return renderWeightItem(convertedOption);
    }
    return renderConvertedItem(convertedOption);
  };

  const renderSlash = (index: number): Element | void => {
    if (index > 0) {
      return <Text> / </Text>;
    }
  };

  const shouldRender = (convertedOption: ConvertedOption): boolean => {
    if (props.configuration.from.title !== 'Distance') {
      return !convertedOption.isEmpty() && convertedOption.option.title !== 'Distance';
    }
    return !convertedOption.isEmpty();
  };

  const isWeightConversion = (convertedOption: ConvertedOption): boolean => {
    return convertedOption.configuration.unit === 'lb' || convertedOption.configuration.unit === 'kg';
  };

  const keyExtractor = (item: ConvertedOption, index: Number): string => {
    return index.toString();
  };

  return (
    <>
      <View style={styles.view}>
        <FlatList
          keyExtractor={keyExtractor}
          data={fromOptions('all')
            .map((option) => new ConvertedOption(option, props.configuration))
            .filter((option) => shouldRender(option))}
          renderItem={(info) => renderItem(info.item)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f2f1f6',
    flex: 7,
  },
  container: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  unitText: {
    color: '#86858a',
  },
  subTitle: {
    fontSize: 25,
    color: '#020202',
    position: 'absolute',
    right: 4,
  },
});

export default ConversionResultView;
