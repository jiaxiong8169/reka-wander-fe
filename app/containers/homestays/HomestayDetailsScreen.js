import React from 'react';
import GradientBackground from '../../components/GradientBackground';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Box, Pressable, ArrowBackIcon, View} from 'native-base';
import {CustomButton} from '../../components/CustomButton';
import FastImage from 'react-native-fast-image';
import {CustomText} from '../../components/texts/custom-text';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const HomestayDetailsScreen = ({navigation, route}) => {
  const {item, checkInDate, checkOutDate, totalDays} = route.params;

  return (
    <GradientBackground fullWidth={true}>
      <View style={styles.container}>
        <FastImage style={styles.image} source={{uri: item.thumbnailSrc}} />
        <Box style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="8" m="1" color="white" />
          </Pressable>
        </Box>
        <View style={styles.textContainer}>
          <CustomText fontSize="2xl">{item.name}</CustomText>
          <CustomText mt="3" mb="3">
            {item.description}
          </CustomText>
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
            <CustomText marginLeft="1" fontSize={10} color="gray.600">
              {item.city}
            </CustomText>
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
            <CustomText marginLeft="1" fontSize={10} color="gray.600">
              RM {item.price ? item.price : item.minPrice}
            </CustomText>
          </View>
          <CustomButton
            colorScheme="secondary"
            style={{marginTop: 20}}
            onPress={() => {
              navigation.navigate('HomestaySelectRoom', {
                item,
                checkInDate,
                checkOutDate,
                totalDays,
              });
            }}>
            Select Rooms
          </CustomButton>
        </View>
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
    paddingTop: 5,
    paddingLeft: 40,
    marginBotton: 60,
    flexDirection: 'row',
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
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    padding: 15,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    justifyContent: 'center',
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
    height: height * 0.35,
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
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    position: 'relative',
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
