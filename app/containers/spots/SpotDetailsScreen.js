import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Image} from 'react-native';
import {Box, Heading, Text, ArrowBackIcon, Pressable} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView} from 'react-native';
import RoundButton from '../../components/RoundButton';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SpotDetailsScreen({navigation, route}) {
  const {authData} = useAuth();
  const {postWithAuth, getWithoutAuth} = useHttpCall();
  const {type, id} = route.params;
  const [item, setItem] = React.useState({}); // TODO: Put initial values
  const [reload, setReload] = React.useState(false);

  React.useEffect(() => {
    getWithoutAuth(`${type}/${id}`).then(({data}) => {
      if (!!data) setItem(data);
    });
  }, [reload]);

  const handleLike = async () => {
    await postWithAuth(`${type}/like`, {
      targetId: id,
      userId: authData && authData.id ? authData.id : 'temporaryDeviceId', // TODO: Implement device ID
    });
    // reload the data
    setReload(!reload);
  };

  // TODO: Copy into clipboard when sharing maybe
  const handleShare = async () => {
    await postWithAuth(`${type}/share`, {
      targetId: id,
      userId: authData && authData.id ? authData.id : 'temporaryDeviceId', // TODO: Implement device ID
    });
    // reload the data
    setReload(!reload);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FastImage style={styles.image} source={{uri: item.thumbnailSrc}} />
        <View style={{flex: 1}}></View>
        <Box style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="8" color="white" m="1" />
          </Pressable>
        </Box>

        <View style={styles.textContainer}>
          <Heading size="2xl" color={'white'}>
            {item.name}
          </Heading>

          <Text fontSize={14} color="white">
            {item.city}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text bold fontSize={14} color="white">
              {item.category}
            </Text>
          </View>
          <Rating
            style={{
              marginRight: 'auto',
              marginTop: 6,
            }}
            imageSize={15}
            ratingCount={5}
            startingValue={item.avgRating}
            tintColor={'#414141'}
            readonly
          />
          <Text mt="3" mb="10" color={'white'}>
            {item.description}
          </Text>
          <RoundButton title="Direction" backgroundColor="#dc2626" />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleLike()}
              style={{flex: 1, justifyContent: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/love.png')}
                tintColor={
                  item.likes &&
                  item.likes.includes(
                    authData?.id ? authData.id : 'temporaryDeviceId',
                  )
                    ? 'red'
                    : 'gray'
                }></Image>
            </TouchableOpacity>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color={
                item.likes &&
                item.likes.includes(
                  authData?.id ? authData.id : 'temporaryDeviceId',
                )
                  ? 'red.500'
                  : 'gray.500'
              }
              style={styles.iconText}>
              {item.likes ? item.likes.length : 0}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.icon}
              source={require('../../assets/message.png')}
              tintColor="red"></Image>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color="red.500"
              style={styles.iconText}>
              {item.reviews ? item.reviews.length : 0}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleShare()}
              style={{flex: 1, justifyContent: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/share.png')}
                tintColor={
                  item.shares &&
                  item.shares.includes(
                    authData?.id ? authData.id : 'temporaryDeviceId',
                  )
                    ? 'red'
                    : 'gray'
                }></Image>
            </TouchableOpacity>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color={
                item.shares &&
                item.shares.includes(
                  authData?.id ? authData.id : 'temporaryDeviceId',
                )
                  ? 'red.500'
                  : 'gray.500'
              }
              style={styles.iconText}>
              {item.shares ? item.shares.length : 0}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#414141',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    // height: height,
    minHeight: height * 0.5 + 20,
    width: '100%',
    paddingTop: '14%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  buttonContainer: {
    height: 60,
    width: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    left: '15%',
    right: 0,
    top: height * 0.33,
    paddingLeft: '10%',
    paddingRight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#414141',
  },
  image: {
    flex: 1,
    width: '100%',
    height: height * 0.4,
    position: 'relative',
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
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
    borderRadius: 5,
  },
});
