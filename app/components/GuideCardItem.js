import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const GuideCardItem = ({item, navigation, marginBottom}) => {
  return (
    <ImageBackground
      style={{
        height: 150,
        margin: 10,
        marginBottom: marginBottom,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
      }}
      source={require('../assets/sky.jpg')}
      key={item.id}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SpotDetails', {
            type: 'guides',
            id: item.id,
          });
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}>
        <View
          style={{
            flex: 3,
            marginLeft: 20,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}>
          <Text
            bold
            fontSize={30}
            letterSpacing="sm"
            lineHeight="xs"
            style={{color: '#000'}}>
            {item.name.toUpperCase()}
          </Text>
          <Text fontSize={12} color="#000">
            {item.city}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 'auto',
              marginTop: 2,
              marginBottom: 10,
            }}>
            <Stars
              display={item.avgRating}
              spacing={2}
              count={5}
              starSize={50}
              fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={'star-outline'}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={'star-half'} style={[styles.myStarStyle]} />
              }
            />
          </View>
        </View>
        <FastImage
          style={{
            width: undefined,
            flex: 2,
            height: undefined,
          }}
          source={{
            uri: item.thumbnailSrc,
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
  button: {
    borderRadius: 100,
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
