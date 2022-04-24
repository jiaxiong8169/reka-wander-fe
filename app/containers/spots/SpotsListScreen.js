import React, {useEffect, useState} from 'react';
import CardItem from '../../components/CardItem';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View, ScrollView} from 'native-base';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import Geolocation from 'react-native-geolocation-service';

export const SpotsListScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const {type, isNearby} = route.params;

  // on load, fetch new 10 records
  useEffect(() => {
    setLoading(true);
    setFull(false);
    if (isNearby) {
      Geolocation.getCurrentPosition(
        position => {
          let query = `${type}/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10`;
          console.log(query);
          getWithoutAuth(query).then(({data}) => {
            setItems(data);
            setLoading(false);
          });
        },
        error => {
          Alert.alert('Error', JSON.stringify(error));
          setLoading(false);
          setItems([]);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } else {
      let query = `${type}?sort=-avgRating&limit=10`;
      getWithoutAuth(query).then(({data}) => {
        setItems(data);
        setLoading(false);
      });
    }
  }, []);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);

    if (isNearby) {
      Geolocation.getCurrentPosition(
        position => {
          let query = `${type}/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10&offset=${items.length}`;
          console.log(query);
          getWithoutAuth(query).then(({data}) => {
            let tmp = JSON.parse(JSON.stringify(items));
            Array.prototype.push.apply(tmp, data);
            if (tmp.length === items.length) setFull(true);
            else setFull(false);
            setItems(tmp);
            setLoading(false);
          });
        },
        error => {
          Alert.alert('Error', JSON.stringify(error));
          setLoading(false);
          setItems([]);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } else {
      let query = `${type}?sort=-avgRating&limit=10&offset=${items.length}`;
      getWithoutAuth(query).then(({data}) => {
        let tmp = JSON.parse(JSON.stringify(items));
        Array.prototype.push.apply(tmp, data);
        if (tmp.length === items.length) setFull(true);
        else setFull(false);
        setItems(tmp);
        setLoading(false);
      });
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle
            text1={isNearby ? 'Nearby' : ''}
            text2={type[0].toUpperCase() + type.substring(1)}
            small={isNearby}
          />
        </View>
      </View>
      <ScrollView style={{marginTop: 10, marginBottom: 50}}>
        {items.map(item => (
          <CardItem
            item={item}
            key={item.id}
            navigation={navigation}
            type={type}
            marginBottom={10}
          />
        ))}
        <LoadMore getData={getData} full={full} loading={loading} />
      </ScrollView>
    </GradientBackground>
  );
};
