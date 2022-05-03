import React, {useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, Dimensions, ScrollView, StyleSheet} from 'react-native';
import {Text, ZStack, Center} from 'native-base';
import {BackButton} from '../../components/BackButton';
import RoundButton from '../../components/RoundButton';
import FastImage from 'react-native-fast-image';
import {useHttpCall} from '../../hooks/useHttpCall';
import {RefreshControl} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const CarRentalDetailsScreen = ({navigation, route}) => {
  const {id} = route.params;
  const [item, setItem] = useState([]);
  const {getWithoutAuth} = useHttpCall();
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onPressHandlerRent = () => {
    navigation.navigate('CarRentalUserInfo', {id: item.id});
  };

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);

    // try to fetch the data
    getWithoutAuth(`vehicles/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItem(data);
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
  return (
    <GradientBackground fullWidth={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', padding: '3%'}}>
          <BackButton navigation={navigation} />
        </View>
        <View style={styles.containerProducts}>
          <Text
            semi-bold
            fontSize={30}
            lineHeight={30}
            color={'gray.500'}
            maxWidth={'70%'}
            style={styles.productName}>
            {item.name}
            {'\n'}
            <Text bold fontSize={15} lineHeight={25}>
              RM {item.price}/day
            </Text>
          </Text>
          <View style={styles.carLeft}>
            <Text bold color={'gray.500'}>
              {item.availability} cars left
            </Text>
          </View>
        </View>

        <Center>
          <ZStack alignItems="center" justifyContent="center" marginLeft="auto">
            <View style={styles.semiEllipse}></View>
            <FastImage
              style={{
                width: 400,
                height: 220,
                resizeMode: 'contain',
              }}
              source={{
                uri: item.thumbnailSrc,
              }}
            />
          </ZStack>
        </Center>
        <View style={{paddingHorizontal: '3%'}}>
          <Text
            bold
            fontSize={25}
            lineHeight={30}
            color={'gray.500'}
            pl={5}
            pr={5}
            pb={10}>
            {item.name} Details{'\n'}
            <Text fontSize={15} lineHeight={25}>
              {item.description}</Text>
          </Text>
        </View>
        {/* <Box style={styles.whatsapp}>
          <Pressable p={1}>
            <Icon name="logo-whatsapp" size={35} color={'green'}></Icon>
          </Pressable>
        </Box> */}
        <RoundButton
          title="Rent"
          backgroundColor="#dc2626"
          onPress={onPressHandlerRent}
        />
      </ScrollView>
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
  productName: {
    // alignSelf: 'flex-start',
    // maxWidth: width - 210,
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
