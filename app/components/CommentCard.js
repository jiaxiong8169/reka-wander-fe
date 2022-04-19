import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  Box,
  Heading,
  Text,
  ArrowBackIcon,
  Pressable,
  VStack,
  HStack,
  Avatar,
  Flex,
} from 'native-base';
import Card from '../components/Card';
import {Rating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CommentCard = props => {
  return (
    <View style={styles.textContainer}>
      <Flex direction="row" w="100%">
      <Avatar
        mr="3"
        source={{
          uri: props.imgSrc,
        }}></Avatar>
      {/* <Avatar
            mr="3"
            source={props.imgSrc}
            ></Avatar> */}
      <View style={{flex: 1}}>
        <Heading size="sm">{props.commentorName}</Heading>
        <Flex direction="row">
          <Rating
            style={{marginLeft: 'auto'}}
            imageSize={10}
            ratingCount={5}
            startingValue={props.rating}
            readonly
          />
          <Text fontSize={10} marginLeft={2}>
            {props.rating}
          </Text>
        </Flex>

        <Text fontSize={10}>{props.comment}</Text>
        <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
          <Text marginLeft="1" fontSize={10} color="gray.600">
            {props.date}
          </Text>
          <Text marginLeft="3" fontSize={10} color="gray.600">
            {props.time}
          </Text>
        </View>
      </View>
    </Flex>
    </View>
  
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
  textContainer:{
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    padding: 20,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginBottom: 10,
  }
});
export default CommentCard;
