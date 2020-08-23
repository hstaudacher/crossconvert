/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {Card, Icon} from 'react-native-elements';
import {fromOptions} from './options/FromOptions';

interface ConversionResultViewProperties {
  configuration: ConversionConfiguration;
}

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
                    200<Text style={styles.unitText}>m</Text>
                    <Text style={{color: option.color}}> / </Text>
                    50<Text style={styles.unitText}>cal</Text>
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
