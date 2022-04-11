import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import Card from '../../components/card/card';
import RadioButtonRN from '../../components/multiple_choice/multiplechoice'
import { useSelector, useDispatch } from 'react-redux';
import { setRentCar } from '../../redux/Planner/actions';
import { color } from 'native-base/lib/typescript/theme/styled-system';

const data = [
    { label: 'Yes', value: 'true', index: 1 },
    { label: 'No', value: 'false', index: 2 },
];


const RentCar = (props) => {
    const { rentCar } = useSelector(state => state.plannerReducer);
    const dispatch = useDispatch();

    // const [view, setview] = useState(1);

    const onPressHandler = (e) => {
        if (e === 'Yes') {
            
            // getInitial();
            dispatch(setRentCar(true));
            // console.log(rentCar);
            // console.log('hi');

        } else {
            // console.log('no');
            // getInitial();
            dispatch(setRentCar(false));
            // console.log(rentCar);
        }

    }

    // const getInitial = () => {
    //     if (rentCar == true) {
    //         return setview(1)
    //     } else {
    //         return setview(2)
    //     }
    // }

    return (
        <View style={styles.body}>
            <Card style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.question}>
                        {props.quest}
                    </Text>
                </View>
                <View style={{ marginHorizontal: '15%' }}>
                    <RadioButtonRN
                        data={data}
                        box={false}
                        // initial={view}
                        animationTypes={['pulse']}
                        circleSize={18}
                        textColor={'black'}
                        selectedBtn={onPressHandler}
                    >
                    </RadioButtonRN>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image
                        source={require('../../assets/kids.png')}
                        style={{
                            padding: 1,
                            aspectRatio: 1,
                            width: '100%',
                            resizeMode: 'contain',
                            // justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            height: undefined
                        }}
                    />
                </View>
            </Card>
        </View>
    //     <View style={{marginHorizontal: '15%'}}>
    //       <RadioButtonRN
    //         data={data}
    //         box={false}
    //         animationTypes={['pulse']}
    //         circleSize={18}
    //         textColor={'black'}
    //         selectedBtn={e => console.log(e)}></RadioButtonRN>
    //     </View>
    //     <View style={{marginTop: 10}}>
    //       <Image
    //         source={require('../../assets/kids.png')}
    //         style={{
    //           padding: 1,
    //           aspectRatio: 1,
    //           width: '100%',
    //           resizeMode: 'contain',
    //           // justifyContent: 'flex-end',
    //           alignItems: 'flex-end',
    //           height: undefined,
    //         }}
    //       />
    //     </View>
    //   </Card>
    // </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    // margin: 10,
  },
  body: {
    // marginBottom: '10%',
    marginBottom: 20,
    marginTop: 30,
    // marginHorizontal: '8%',
    width: '100%',
    // padding: 10,
    // marginLeft: 20,
    // marginRight:20,
    // margin: '8%',
    // flex: 1,
    // alignItems: 'center',
    // backgroundColor: '#ffffff',
    // borderRadius: 20,
    // textAlign: 'center',
  },
  body_container: {
    alignItems: 'center',
  },
  question: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 10,
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
});

export default RentCar;
