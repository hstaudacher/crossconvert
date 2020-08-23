/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {Card, Icon} from 'react-native-elements';
import {fromOptions} from './options/FromOptions';
import {ConversionResult} from './options/FromOption';

interface ConversionResultViewProperties {
  configuration: ConversionConfiguration;
}

const renderSlash = (index: number): Element | void => {
  if (index > 0) {
    return <Text> / </Text>;
  }
};

const renderEmpty = (results: Array<ConversionResult>): Element | void => {
  if (results.length === 0) {
    return <Text>-- </Text>;
  }
};

const ConversionResultView = (props: ConversionResultViewProperties) => {
  return (
    <>
      <View style={{backgroundColor: '#f2f1f6', flex: 7}}>
        {fromOptions('all').map((option, i) => (
          <Card key={i} containerStyle={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.descriptionBox}>
                <Icon name={option.icon} type={option.type} color={option.color} size={22} />
                <Text style={{fontSize: 25, color: option.color, marginLeft: 6}}>{option.title}</Text>
              </View>
              <View style={styles.textBox}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.text}>
                    {option.convert(props.configuration).map((result, j) => (
                      <Text key={j}>
                        {renderSlash(j)}
                        {result.value}
                        <Text style={styles.unitText}>{result.unit}</Text>
                      </Text>
                    ))}
                    {renderEmpty(option.convert(props.configuration))}
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
