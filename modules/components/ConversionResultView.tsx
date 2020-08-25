/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {Card, Icon} from 'react-native-elements';
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

const renderEmpty = (convertedOption: ConvertedOption): Element | void => {
  if (convertedOption.isEmpty()) {
    return <Text>-- </Text>;
  }
};

const determineContainerStyle = (convertedOption: ConvertedOption): StyleProp<ViewStyle> => {
  if (convertedOption.isEmpty()) {
    return styles.containerEmpty;
  }
  return styles.container;
};

const ConversionResultView = (props: ConversionResultViewProperties) => {
  return (
    <>
      <View style={{backgroundColor: '#f2f1f6', flex: 7}}>
        {fromOptions('all')
          .map((option) => new ConvertedOption(option, props.configuration))
          .map((convertedOption, i) => (
            <Card key={i} containerStyle={determineContainerStyle(convertedOption)}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.descriptionBox}>
                  <Icon
                    name={convertedOption.option.icon}
                    type={convertedOption.option.type}
                    color={convertedOption.option.color}
                    size={22}
                  />
                  <Text style={{fontSize: 25, color: convertedOption.option.color, marginLeft: 6}}>
                    {convertedOption.option.title}
                  </Text>
                </View>
                <View style={styles.textBox}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>
                      {convertedOption.conversionResults.map((singelResult, j) => (
                        <Text key={j}>
                          {renderSlash(j)}
                          {singelResult.value}
                          <Text style={styles.unitText}>{singelResult.unit}</Text>
                        </Text>
                      ))}
                      {renderEmpty(convertedOption)}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 0,
  },
  containerEmpty: {
    borderRadius: 10,
    borderWidth: 0,
    opacity: 0.5,
  },
  unitText: {
    color: '#86858a',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#020202',
  },
  descriptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default ConversionResultView;
