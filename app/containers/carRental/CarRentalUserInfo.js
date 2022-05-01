import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';

import Card from '../../components/Card';
import {CalendarCar} from '../../components/CalenderPicker/Calender';
import {useAuth} from '../../hooks/useAuth';

export default function UserCarRentalInfo({navigation, route}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {authData} = useAuth();
  const {putWithAuth} = useHttpCall();

  const [reload, setReload] = React.useState(true);
  const [item, setItem] = useState([]);
  const {getWithoutAuth} = useHttpCall();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);

    // try to fetch the data
    getWithoutAuth(`vehicles/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItem(data);

          // update the cached data
          let clonedListData = JSON.parse(JSON.stringify(listData));
          for (let i = 0; i < clonedListData.length; i++) {
            if (clonedListData[i].id === id) {
              clonedListData[i] = data;
              break;
            }
          }
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

  const updateAPI = () => {};

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column', marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <BackButton navigation={navigation} />
            <Text style={{fontWeight: '500', fontSize: 28, color: '#005533'}}>
              {item.name}
            </Text>
            {/* <BlueSubtitle text1="Hi" text2={`Welcome,`} /> */}
          </View>
          <Text color="rgb(117,157,246)" style={{fontSize: 17}}>
            Fill in all fields to book{' '}
            <Text style={{fontWeight: '500', fontSize: 20, color: '#005533'}}>
              {item.name}
            </Text>
          </Text>
        </View>

        <View>
          <Text
            style={{
              margin: 3,
              fontSize: 17,
              color: `#009B66`,
              fontWeight: '700',
              fontFamily: 'sans-serif-light',
              textAlign: 'center',
            }}>
            Pickup Details
          </Text>
          <Card style={{margin: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}>
                <CalendarCar
                  mode={'date'}
                  type={'Pickup'}
                  url={require('../../assets/calendar_icon.png')}
                />
              </View>
              <View style={{flexDirection: 'column', marginTop: 5}}>
                <CalendarCar
                  mode={'time'}
                  type={'Pickup'}
                  url={require('../../assets/clock_icon.png')}
                />
              </View>
            </View>
          </Card>

          <Text
            style={{
              margin: 3,
              fontSize: 17,
              color: `#009B66`,
              fontWeight: '700',
              fontFamily: 'sans-serif-light',
              textAlign: 'center',
            }}>
            Return Details
          </Text>
          <Card style={{margin: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}>
                <CalendarCar
                  mode={'date'}
                  type={'Return'}
                  url={require('../../assets/calendar_icon.png')}
                />
              </View>
              <View style={{flexDirection: 'column', marginTop: 5}}>
                <CalendarCar
                  mode={'time'}
                  type={'Return'}
                  url={require('../../assets/clock_icon.png')}
                />
              </View>
            </View>
          </Card>

          <Text
            style={{
              margin: 3,
              fontSize: 17,
              color: `#009B66`,
              fontWeight: '700',
              fontFamily: 'sans-serif-light',
              textAlign: 'center',
            }}>
            Location Details
          </Text>
          <Card style={{margin: 10}}>
            <View>
              <View style={{flexDirection: 'column', marginTop: 5}}>
               
              </View>
            </View>
          </Card>
        </View>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <TouchableOpacity onPress={updateAPI}>
            <Text
              style={{
                color: 'white',
                padding: 12,
                backgroundColor: '#00A099',
                borderRadius: 50,
                textAlign: 'center',
                marginHorizontal: 80,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
