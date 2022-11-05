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
  Dimensions,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DefaultLabel from './DefaultLabel';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
const {width} = Dimensions.get('window');

export const PriceSlider = ({
  // onPressExpandPrice,
  // expandPrice,
  setMaxPriceRange,
  setMinPriceRange,
  maxPriceValue,
  minPriceValue,
  minPriceRange,
  maxPriceRange,
  step,
  // defaultMaxValue,
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
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 2,
            }}>
            <Text style={{fontWeight: '400', fontSize: 11, color: 'black'}}>
              Your Budget (per night)
            </Text>
            <Text style={{fontWeight: '700', color: 'black', fontSize: 12}}>
              RM {minPriceRange} - RM {maxPriceRange}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandPrice}>
        <View
          style={{
            // alignItems: 'center',
            width: '100%',
            // flex: 5,
            // minHeight: 50,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // minHeight: 70,
              // flex: 5,
              paddingTop: 15,
              // justifyContent: 'space-between',
              // backgroundColor: 'blue',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                flex: 2,
                justifyContent: 'center',
                // marginHorizontal: 5,
                // backgroundColor: 'red',
              }}>
              <Text style={{fontSize: 13, paddingBottom: 1}}>RM </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                }}>
                {minPriceRange}
              </Text>
            </View>
            <View style={{flex: 5, marginHorizontal: 3}}>
              <MultiSlider
                values={[minPriceRange, maxPriceRange]}
                sliderLength={width * 0.45}
                // width='50%'
                min={minPriceValue}
                max={maxPriceValue}
                step={step}
                selectedStyle={{backgroundColor: '#4169e1'}}
                markerStyle={{backgroundColor: '#4169e1'}}
                minMarkerOverlapDistance={10}
                enableLabel={true}
                customLabel={DefaultLabel}
                onValuesChangeFinish={e => {
                  setMinPriceRange(e[0]);
                  setMaxPriceRange(e[1]);
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 2,
                marginHorizontal: 5,
                // backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 13}}>RM </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000',
                }}>
                {maxPriceRange}
              </Text>
            </View>
          </View>
        </View>
      </Collapsible>
    </View>
  );
};
