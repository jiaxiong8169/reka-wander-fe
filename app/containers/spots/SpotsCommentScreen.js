import GradientBackground from '../../components/GradientBackground';
import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Image} from 'react-native';
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
  TextArea,
} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView, SafeAreaView} from 'react-native';
import RoundButton from '../../components/RoundButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommentCard from '../../components/CommentCard';

export default function SpotsCommentScreen({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/home.jpg')}></Image>
        <View style={{flex: 1}}></View>
        <Box style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="8" m="1" color="white" />
          </Pressable>
        </Box>

        <View style={styles.textContainer}>
          <Heading size="2xl">Hotel 1234</Heading>
          <Text mt="3" mb="3">
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadas
          </Text>

          <Rating
            style={{
              marginRight: 'auto',
              marginBottom: 6,
            }}
            imageSize={15}
            ratingCount={5}
            startingValue={4}
            tintColor={'white'}
            readonly
          />
          {/* <Text fontSize={14}>
            Kota Kinabalu
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/pin.png')}
              tintColor={'#52525b'}
            />
            <Text marginLeft="1" fontSize={10} color="gray.600">
              Kinabalu
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/money.png')}
              tintColor={'#52525b'}
            />
            <Text marginLeft="1" fontSize={10} color="gray.600">
              RM 250/pax
            </Text>
            <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
              <Image
                style={{width: 15, height: 15, marginHorizontal: 2}}
                source={require('../../assets/love.png')}
                tintColor={'#52525b'}
              />
              <Text marginLeft="1" fontSize={10} color="gray.600">
                97
              </Text>
              <Image
                style={{width: 15, height: 15, marginHorizontal: 10}}
                source={require('../../assets/message.png')}
                tintColor={'#52525b'}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Heading size="sm">Reviews & Comments</Heading>
      </View>
      <View style={styles.commentBox}>
        <TextArea h={20} px="3" placeholder="Write your review..." />
      </View>
      
      <Rating
        style={{
          position: 'relative',
          top: -16,
          alignSelf: 'flex-start',
          marginHorizontal: 20,
        }}
        imageSize={15}
        ratingCount={5}
        startingValue={0}
        tintColor='#eee'
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <View></View>
      <CommentCard
        comment="Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into"
        date="3/4/22"
        time="13:31"
        rating="1.0"
        commentorName="Sarah"
        imgSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"></CommentCard>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textContainer: {
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
  },
  commentBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 8,
    marginBottom: 10,
    // borderColor: 'grey',
    // borderWidth: 3,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: 'gray',
  },
  iconText: {
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    maxWidth: 100,
    position: 'relative',
    // right: "-70%",
    // left: 0,
    top: -17,
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
  },
});
