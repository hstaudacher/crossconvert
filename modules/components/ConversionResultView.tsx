/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import ConversionConfiguration from './ConversionConfiguration';
import {Card, Icon} from 'react-native-elements';
import {fromOptions} from './FromOptions';

interface ConversionResultViewProperties {
  configuration: ConversionConfiguration;
}

const ConversionResultView = (props: ConversionResultViewProperties) => {
  return (
    <>
      <View style={{backgroundColor: '#f2f1f6', flex: 7}}>
        {fromOptions('all').map((option, i) => (
          <Card key={i} containerStyle={{borderRadius: 10, borderWidth: 0}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Icon name={option.icon} type={option.type} color={option.color} size={22} />
                <Text style={{fontSize: 25, color: option.color, marginLeft: 6}}>{option.title}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: '#020202'}}>200</Text>
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: '#86858a'}}>m</Text>
                </View>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: option.color}}> / </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: '#020202'}}>50</Text>
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: '#86858a'}}>cal</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </>
  );
};

export default ConversionResultView;
