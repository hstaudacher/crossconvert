/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {ListItem, Icon} from 'react-native-elements';
import {fromOptions} from './options/FromOptions';
import {ConversionResult, FromOption} from './options/FromOption';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

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

const renderSlash = (index: number): Element | void => {
  if (index > 0) {
    return <Text> / </Text>;
  }
};

const shouldRender = (convertedOption: ConvertedOption): boolean => {
  return !convertedOption.isEmpty();
};

const isWeightConversion = (convertedOption: ConvertedOption): boolean => {
  return convertedOption.configuration.unit === 'lbs' || convertedOption.configuration.unit === 'kg';
};

const renderChevron = (convertedOption: ConvertedOption): Element | void => {
  if (isWeightConversion(convertedOption)) {
    return <ListItem.Chevron style={{marginLeft: 10}} name="chevron-forward-outline" type="ionicon" />;
  }
};

const onOptionPress = (convertedOption: ConvertedOption, componentId: string) => {
  if (isWeightConversion(convertedOption)) {
    Navigation.push(componentId, {
      component: {
        name: 'WeightDetails',
        options: {
          topBar: {
            title: {
              text: 'Weight',
              color: 'tomato',
            },
            backButton: {
              title: 'Conversion',
              color: 'tomato',
            },
          },
        },
        passProps: {
          configuration: convertedOption.configuration,
        },
      },
    });
  }
};

const renderItem = (convertedOption: ConvertedOption, componentId: string) => {
  return (
    <>
      <ListItem
        bottomDivider
        containerStyle={styles.container}
        onPress={() => onOptionPress(convertedOption, componentId)}>
        <Icon
          name={convertedOption.option.icon}
          type={convertedOption.option.type}
          color={convertedOption.option.color}
          size={26}
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
                {renderChevron(convertedOption)}
              </Text>
            ))}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const keyExtractor = (item: ConvertedOption, index: Number): string => {
  return index.toString();
};

const ConversionResultView = (props: ConversionResultViewProperties) => {
  return (
    <>
      <View style={styles.view}>
        <FlatList
          keyExtractor={keyExtractor}
          data={fromOptions('all')
            .map((option) => new ConvertedOption(option, props.configuration))
            .filter((option) => shouldRender(option))}
          renderItem={(info: ListRenderItemInfo<ConvertedOption>) => {
            return renderItem(info.item, props.componentId);
          }}
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
