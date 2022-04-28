import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
import {View, Dimensions, ScrollView, Image, StyleSheet} from 'react-native';
import {
  Text,
  Input,
  Box,
  ZStack,
  Center,
  Flex,
  Pressable,
  ArrowBackIcon,
} from 'native-base';
import {BackButton} from '../../components/BackButton';
import RoundButton from '../../components/RoundButton';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHttpCall } from '../../hooks/useHttpCall';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const CarRentalDetailsScreen = ({navigation, route}) => {
  return (
    <ScrollView>
      <GradientBackground>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
        </View>
        <View style={styles.containerProducts}>
          <Text
            semi-bold
            fontSize={30}
            lineHeight={30}
            color={'gray.500'}
            style={styles.productName}>
            BMW
            {'\n'}
            <Text bold fontSize={15} lineHeight={25}>
              RM 300/day
            </Text>
          </Text>
          <View style={styles.carLeft}>
            <Text bold fontSize={20} color={'gray.500'}>
              33333 cars left
            </Text>
          </View>
        </View>

        <Center mt={10}>
          <ZStack alignItems="center" justifyContent="center">
            <View style={styles.semiEllipse}></View>
            <FastImage
              style={{
                width: 400,
                height: 220,
                resizeMode: 'contain',
                marginTop: -50,
              }}
              source={{
                uri: 'https://www.hyundai.com.my/images/find-a-car/all-vehicles/palisade-lx2.png',
              }}
            />
          </ZStack>
        </Center>
        <View>
          <Text
            bold
            fontSize={25}
            lineHeight={30}
            color={'gray.500'}
            pl={5}
            pr={5}
            pb={10}>
            BMW Details{'\n'}
            <Text fontSize={15} lineHeight={25}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Text>
        </View>

        <Box style={styles.whatsapp}>
          <Pressable p={1}>
            <Icon name="logo-whatsapp" size={35} color={'green'}></Icon>
          </Pressable>
        </Box>
        <RoundButton title="Rent" backgroundColor="#dc2626" />
      </GradientBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  semiEllipse: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 300,
    transform: [{scaleX: 1.8}],
  },
  containerProducts: {
    paddingTop: 5,
    paddingLeft: 40,
    marginBotton: 60,
    flexDirection: 'row',
    // maxWidth: width-170,
    justifyContent: 'space-between',
    width: width,
  },
  productName: {
    alignSelf: 'flex-start',
    maxWidth: width - 210,
  },
  carLeft: {
    height: 30,
    paddingHorizontal: 20,
    marginLeft: 'auto',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  whatsapp: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
});
