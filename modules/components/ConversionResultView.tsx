/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {ListItem, Icon, Overlay} from 'react-native-elements';
import {fromOptions} from './options/FromOptions';
import {ConversionResult, FromOption} from './options/FromOption';

class ConvertedOption {
  conversionResults: Array<ConversionResult>;
  constructor(readonly option: FromOption, readonly configuration: ConversionConfiguration) {
    this.conversionResults = option.convert(configuration);
  }

  isEmpty = (): boolean => {
    return this.conversionResults.length === 0;
  };
}

interface ConversionResultViewProperties {
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

const onOptionPress = (convertedOption: ConvertedOption, toggleOverlay: Function) => {
  if (isWeightConversion(convertedOption)) {
    toggleOverlay();
  }
};

const renderItem = (convertedOption: ConvertedOption, toggleOverlay: Function) => {
  return (
    <>
      <ListItem
        bottomDivider
        containerStyle={styles.container}
        onPress={() => onOptionPress(convertedOption, toggleOverlay)}>
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
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <View style={styles.view}>
        <FlatList
          keyExtractor={keyExtractor}
          data={fromOptions('all')
            .map((option) => new ConvertedOption(option, props.configuration))
            .filter((option) => shouldRender(option))}
          renderItem={(info: ListRenderItemInfo<ConvertedOption>) => {
            return renderItem(info.item, toggleOverlay);
          }}
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text>Hello from Overlay!</Text>
        </Overlay>
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
