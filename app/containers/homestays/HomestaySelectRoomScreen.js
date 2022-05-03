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
  Heading,
  AspectRatio,
  Stack,
  HStack,
  Button,
  Divider,
} from 'native-base';
import {BackButton} from '../../components/BackButton';
import RoundButton from '../../components/RoundButton';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {RefreshControl} from 'react-native';
import {RatingButton} from '../../components/RatingButton';
import {HomestayRoomCardItem} from '../../components/HomestayRoomCardItem';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const HomestaySelectRoomScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [items, setItems] = useState([]);
  const {getWithoutAuth} = useHttpCall();
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);

    // try to fetch the data
    getWithoutAuth(`homestays/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItems(data.rooms);
        }
        // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      })
      .catch(err => {
        console.log(err);
        // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      });
  }, [reload]);

  console.log(items);
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: '3%'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1={'Homestays ABC'}></BlueSubtitle>
        </View>
        {items.map((item, index) => (
          <HomestayRoomCardItem
            key={index}
            name={item.name}
            price={item.price}
            pax={item.pax}
            availability={item.availability}
            thumbnailSrc={item.thumnailSrc}></HomestayRoomCardItem>
        ))}
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
