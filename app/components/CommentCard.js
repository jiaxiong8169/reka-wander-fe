import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Flex, Pressable} from 'native-base';
import {RatingButton} from './RatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from './texts/custom-text';
import {CustomButton} from './CustomButton';

const CommentCard = props => {
  return (
    <View style={[styles.textContainer, props.style]}>
      <Flex direction="row" w="100%">
        {props.canEdit && (
          <CustomButton
            variant="link"
            onPress={() => {
              if (!!props.setEditReview) props.setEditReview(true);
            }}
            size="xs"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            Edit
          </CustomButton>
        )}
        <Icon name="person-circle-sharp" size={50} style={{marginRight: 5}} />
        <View style={{flex: 1}}>
          <CustomText fontSize="sm">{props.commentorName}</CustomText>
          <Flex
            direction="row"
            alignItems="center"
            marginTop="1"
            marginBottom="1">
            <RatingButton rating={props.rating} />
            <CustomText fontSize={9} marginLeft={2}>
              {props.rating}
            </CustomText>
          </Flex>
          <CustomText fontSize="xs">{props.comment}</CustomText>
          <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
            <CustomText marginLeft="1" fontSize={10} color="gray.600">
              {props.date}
            </CustomText>
            <CustomText marginLeft="3" fontSize={10} color="gray.600">
              {props.time}
            </CustomText>
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
    padding: 10,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
export default CommentCard;
