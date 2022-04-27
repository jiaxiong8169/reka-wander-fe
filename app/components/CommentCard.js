import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Heading, Text, Flex} from 'native-base';
import {RatingButton} from './RatingButton';
import Icon from 'react-native-vector-icons/Ionicons';

const CommentCard = props => {
  return (
    <View style={styles.textContainer}>
      <Flex direction="row" w="100%">
        <Icon name="person-circle-sharp" size={50} style={{marginRight: 5}} />
        {/* <Avatar
          mr="3"
          source={{
            uri: props.imgSrc,
          }}></Avatar> */}
        <View style={{flex: 1}}>
          <Heading size="sm">{props.commentorName}</Heading>
          <Flex
            direction="row"
            alignItems="center"
            marginTop="1"
            marginBottom="1">
            <RatingButton rating={props.rating} />
            <Text fontSize={9} marginLeft={2}>
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
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '85%',
    padding: 10,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
export default CommentCard;
