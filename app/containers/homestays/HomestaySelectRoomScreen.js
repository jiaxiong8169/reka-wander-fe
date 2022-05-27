import React, {useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {BackButton} from '../../components/BackButton';
import {useHttpCall} from '../../hooks/useHttpCall';
import {HomestayRoomCardItem} from '../../components/HomestayRoomCardItem';
import {useSelector, useDispatch} from 'react-redux';
import {
  setHomestayName,
  setHomestayLat,
  setHomestayLong,
  setHomestayData,
} from '../../redux/Homestay/actions';
import {CustomButton} from '../../components/CustomButton';

const height = Dimensions.get('window').height;

export const HomestaySelectRoomScreen = ({navigation, route}) => {
  const {id, data} = route.params;
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const {getWithoutAuth} = useHttpCall();
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [hotelName, sethotelName] = React.useState('');
  const {homestayId, roomsAdded, totalPrice} = useSelector(
    state => state.homestayReducer,
  );

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);
    // try to fetch the data
    getWithoutAuth(`homestays/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItems(data.rooms);
          sethotelName(data.name);
          dispatch(setHomestayName(data.name));
          dispatch(setHomestayLat(data.loc.coordinates[1]));
          dispatch(setHomestayLong(data.loc.coordinates[0]));
          dispatch(setHomestayData(data));
          // console.log(roomsAdded);
          console.log(totalPrice);
        } // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      })
      .catch(err => {
        console.log(err);
        // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      });
  }, [reload, id]);

  return (
    <GradientBackground
      footer={
        <View
          style={{
            flexDirection: 'row',
            padding: '3%',
            width: '100%',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            shadowOpacity: 0.26,
            elevation: 10,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '60%',
              fontSize: 20,
              fontWeight: 'bold',
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignItems: 'center',
              }}>
              Total Price : RM {totalPrice._W ? totalPrice._W : 0}
            </Text>
          </View>
          <CustomButton
            size="md"
            colorScheme="secondary"
            onPress={() => {
              navigation.navigate('HomestayRent', {
                id: id,
                data: data,
              });
            }}>
            Rent Rooms
          </CustomButton>
        </View>
      }>
      <View></View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: '3%', width: '90%'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle key={id} text1={hotelName} />
        </View>

        {items.map(item => (
          <HomestayRoomCardItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            pax={item.pax}
            availability={item.availability}
            thumbnailSrc={item.thumnailSrc}
          />
        ))}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
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
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
