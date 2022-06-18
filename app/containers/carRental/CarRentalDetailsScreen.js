import React from 'react';
import GradientBackground from '../../components/GradientBackground';
import {StyleSheet, Image} from 'react-native';
import {ZStack, Center, View, Box} from 'native-base';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';

export const CarRentalDetailsScreen = ({navigation, route}) => {
  const {item} = route.params;

  const onPressHandlerRent = () => {
    navigation.navigate('CarRentalUserInfo', {item});
  };

  return (
    <GradientBackground fullWidth={true} stickyHeader={true}>
      <View style={{alignItems: 'flex-start'}}>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.containerProducts}>
        <Box>
          <CustomText bold fontSize="3xl" color={'gray.500'}>
            {item.name}
          </CustomText>
          <CustomText bold>RM {item.price}/day</CustomText>
        </Box>

        <View style={styles.carLeft}>
          <CustomText bold color={'gray.500'}>
            {item.availability} cars left
          </CustomText>
        </View>
      </View>
      <Center>
        <ZStack
          alignItems="center"
          justifyContent="center"
          style={{marginTop: 120, marginBottom: 120}}>
          <View style={styles.semiEllipse}></View>
          <Image
            style={{
              width: 350,
              height: 220,
              resizeMode: 'contain',
            }}
            alt="thumbnail"
            source={{
              uri: item.thumbnailSrc,
            }}
          />
        </ZStack>
      </Center>
      <View style={{paddingHorizontal: 20}}>
        <CustomText bold fontSize="xl" color={'gray.500'} pb={5}>
          Details
        </CustomText>
        <CustomText>{item.description}</CustomText>
        <CustomButton
          style={{marginTop: 30, marginBottom: 30}}
          colorScheme="secondary"
          onPress={onPressHandlerRent}>
          Rent
        </CustomButton>
      </View>
    </GradientBackground>
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
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  carLeft: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
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
