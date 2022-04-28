import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function RecommendedCardDetails({
  navigation,
  perks,
  url,
  id,
  styles,
  name,
  type,
  children,
}) {
  return (
    <TouchableOpacity
      style={{margin: 4}}
      onPress={() => {
        navigation.navigate('SpotDetails', {
          type: type,
          id: id,
        });
      }}>
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            borderColor: '#000',
            borderBottomWidth: 1,
            paddingBottom: 10,
            width:'100%'
          },
          styles,
        ]}>
        <FastImage
          style={{
            flex: 1,
            width: undefined,
            resizeMode: 'contain',
            borderRadius: 5,
            paddingRight: 8,
          }}
          source={{uri: url}}
        />

        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            marginLeft: 3,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
            }}>
            {name}
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: '#000',
            }}>
            {children}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            {perks !== '' && (
              <Text
                style={{
                  fontSize: 11,
                  color: '#000',
                }}>
                {perks}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
