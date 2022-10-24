import React, {useEffect, useState, useRef} from 'react';
import Card from '../../components/Card';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DefaultLabel from './DefaultLabel';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
export const PriceSlider = ({
  // onPressExpandPrice,
  // expandPrice,
  setMaxPrizeRange,
  setMinPrizeRange,
  maxPriceValue,
  minPriceValue,
  minPrizeRange,
  maxPrizeRange,
  defaultMinValue,
  defaultMaxValue,
}) => {
  const [expandPrice, setExpandPrice] = useState(true);

  const onPressExpandPrice = () => {
    setExpandPrice(current => !current);
  };
  return (
    <View>
      <TouchableOpacity onPress={onPressExpandPrice}>
        <Card
          style={{
            backgroundColor: 'aliceblue',
            shadowColor: 'white',
            marginTop: 15,
          }}>
          <Text style={{fontWeight: '400', fontSize: 12, color: 'black'}}>
            Your Budget (per night)
          </Text>
          <Text style={{fontWeight: '700', color: 'black', fontSize: 14}}>
            RM {minPrizeRange} - RM {maxPrizeRange}
          </Text>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandPrice}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '50%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15}}>RM </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#000',
              }}>
              {minPrizeRange}
            </Text>
            <Text style={{fontSize: 29}}> - </Text>
            <Text style={{fontSize: 15}}>RM </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#000',
              }}>
              {maxPrizeRange}
            </Text>
          </View>
          <MultiSlider
            values={[defaultMinValue, defaultMaxValue]}
            sliderLength={250}
            min={minPriceValue}
            max={maxPriceValue}
            step={50}
            selectedStyle={{backgroundColor: '#4169e1'}}
            markerStyle={{backgroundColor: '#4169e1'}}
            minMarkerOverlapDistance={10}
            enableLabel={true}
            customLabel={DefaultLabel}
            onValuesChangeFinish={e => {
              setMinPrizeRange(e[0]);
              setMaxPrizeRange(e[1]);
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
};
