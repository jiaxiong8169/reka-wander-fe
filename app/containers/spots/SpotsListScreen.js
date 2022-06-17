import React, {useEffect, useState} from 'react';
import CardItem from '../../components/CardItem';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View, ScrollView} from 'native-base';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import {RefreshControl} from 'react-native';

export const SpotsListScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [full, setFull] = useState(false);
  const [reload, setReload] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const {type, isNearby} = route.params;

  // on load, fetch new 10 records
  useEffect(() => {
    setLoading(true);
    setFull(false);
    if (isNearby) {
      getLocationPermissionAndExecute(
        position => {
          let query = `${type}/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10`;
          console.log(query);
          getWithoutAuth(query).then(({data}) => {
            if (data.length === 0) setFull(true);
            setItems(data);
            setLoading(false);
          });
        },
        () => {
          setLoading(false);
          setItems([]);
          if (data.length === 0) setFull(true);
        },
      );
    } else {
      let query = `${type}?sort=-avgRating&limit=10`;
      getWithoutAuth(query).then(({data}) => {
        setItems(data);
        setLoading(false);
      });
    }
  }, [reload]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);

    if (isNearby) {
      getLocationPermissionAndExecute(
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
        () => {
          setLoading(false);
          setItems([]);
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
    <GradientBackground
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => setReload(!reload)}
        />
      }
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      stickyHeader={true}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1={type[0].toUpperCase() + type.substring(1)}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
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
      </View>
    </GradientBackground>
  );
};
