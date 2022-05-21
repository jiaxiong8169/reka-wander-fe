import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Card from '../../components/card/card';

export default function RecommendedCard({
  navigation,
  title,
  children,
  styles,
  type,
  fieldName,
  fieldNameObj,
}) {
  return (
    <View>
      <Text
        style={{
          margin: 5,
          fontSize: 20,
          color: `#6A5ACD`,
          fontWeight: '600',
          fontFamily: 'sans-serif-light',
        }}>
        Recommended {title}
      </Text>
      <Card style={{marginVertical: 10}}>
        <View style={styles}>{children}</View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{marginTop: 4}}
            onPress={() => {
              // handle homestay separately
              if (type === 'homestays') {
                navigation.navigate('HomestayEdit', {
                  fieldName,
                  fieldNameObj,
                });
              } else
                navigation.navigate('Edit', {
                  type,
                  fieldName,
                  fieldNameObj,
                });
            }}>
            <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
