import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {
  setAccommodationBudget,
  setRestaurantBudget,
  setVehicleBudget,
  setAttractionBudget,
} from '../../redux/Planner/actions';

const TravelBudget = () => {
  // const [budget1, setBudget1] = useState([
  //   {accommodation: 0.0},
  //   {vehicle: 0.0},
  //   {restaurant: 0.0},
  //   {attraction: 0.0},
  // ]);
  const {
    accommodationBudget,
    restaurantBudget,
    vehicleBudget,
    attractionBudget,
  } = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();
  const [totalBudget, setTotalbudget] = useState(0);
  useEffect(() => {
    // console.log(typeof(budget1));
    let total =
    parseFloat(accommodationBudget) + parseFloat(restaurantBudget) + parseFloat(vehicleBudget) + parseFloat(attractionBudget);
    // let accbud= accommodationBudget;
    // let restbud = restaurantBudget;
    // console.log(typeof(restbud));
    // console.log('abcd');
    // console.log(typeof total);
    setTotalbudget(total);
  }, [accommodationBudget, restaurantBudget, vehicleBudget, attractionBudget]);

  return (
    <View style={styles.body_container}>
      <Text style={styles.question}>Travel budget</Text>
      <Text style={styles.subQuestion}>Enter your estimated budget for the whole trip per category</Text>
      <View style={{width: '100%', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
            // height: '10%',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              flex: 1,
              height: undefined,
              // alignSelf: 'center'
            }}>
            Accommodation:{' '}
          </Text>
          <View
            style={{
              flex: 1,
              height: undefined,
              // backgroundColor: 'blue',
              // alignSelf: 'center'
            }}>
            <CustomTextInput
              // autoFocus={true}
              mb={0}
              type="number"
              keyboardType={'number-pad'}
              onChangeText={v => {
                // dispatch(setBudget(prev => ({...prev, accommodation: v})));
                dispatch(setAccommodationBudget(v));
              }}
              placeholder="RM..."
              value={accommodationBudget}
              paddingTop={1}
              marginBottom={0}
              paddingBottom={1}
              textStyle={{paddingTop: 0}}
              style={{
                flex: 1,
                height: undefined,
                padding: 0,
                margin: 0,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
            // height: '10%',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              flex: 1,
              // alignSelf: 'center'
            }}>
            Vehicle:{' '}
          </Text>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'blue',
              // alignSelf: 'center'
            }}>
            <CustomTextInput
              // autoFocus={true}
              mb={0}
              type="number"
              keyboardType={'number-pad'}
              onChangeText={v => {
                dispatch(setVehicleBudget(v));
                // dispatch(setBudget(v));
              }}
              placeholder="RM..."
              value={vehicleBudget}
              paddingTop={1}
              marginBottom={0}
              paddingBottom={1}
              textStyle={{paddingTop: 0}}
              style={{
                flex: 1,
                padding: 0,
                margin: 0,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
            // height: '10%',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              flex: 1,
              // alignSelf: 'center'
            }}>
            Restaurant:{' '}
          </Text>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'blue',
              // alignSelf: 'center'
            }}>
            <CustomTextInput
              mb={0}
              // autoFocus={true}
              type="number"
              keyboardType={'number-pad'}
              onChangeText={v => {
                dispatch(setRestaurantBudget(v));
                // dispatch(setBudget(v));
              }}
              placeholder="RM..."
              value={restaurantBudget}
              paddingTop={1}
              marginBottom={0}
              paddingBottom={1}
              textStyle={{paddingTop: 0}}
              style={{
                flex: 1,
                padding: 0,
                margin: 0,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            marginBottom: 10,
            // height: '10%',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              flex: 1,
              // alignSelf: 'center'
            }}>
            Attraction:{' '}
          </Text>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'blue',
              // alignSelf: 'center'
            }}>
            <CustomTextInput
              mb={0}
              // autoFocus={true}
              type="number"
              keyboardType={'number-pad'}
              onChangeText={v => {
                dispatch(setAttractionBudget(v));
                // dispatch(setBudget(v));
              }}
              placeholder="RM..."
              value={attractionBudget}
              paddingTop={1}
              marginBottom={0}
              paddingBottom={1}
              textStyle={{paddingTop: 0}}
              style={{
                flex: 1,
                padding: 0,
                margin: 0,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 15,
          display: 'flex',
        }}>
        <Text style={{flex: 1}}>Total Budget:</Text>
        <Text style={{color: '#000000', fontSize: 25,color: 'red', paddingRight: 10,}}>{totalBudget}</Text>
      </View>

      <View style={{marginTop: 10}}>
        <Image
          source={require('../../assets/budget.png')}
          style={{
            aspectRatio: 1,
            width: '80%',
            resizeMode: 'contain',
            height: undefined,
          }}
          alt="budget"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  body_container: {
    alignItems: 'center',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subQuestion: {
    color: '#000000',
    fontSize: 15,
    marginTop: 7,
    fontFamily: 'sans-serif-medium',
    // fontWeight: 'bold',
    marginBottom: 35,
  },
  button: {
    backgroundColor: 'red',
    width: 150,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  input: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
  },
});

export default TravelBudget;
