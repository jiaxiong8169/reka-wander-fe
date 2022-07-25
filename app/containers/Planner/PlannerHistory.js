import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View} from 'native-base';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import {RefreshControl} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {TripCardItem} from '../../components/TripCardItem';

export const PlannerHistory = ({navigation}) => {
  const {authData} = useAuth();
  const {getWithAuth} = useHttpCall();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);

  // on load and on search, fetch 10 new trip histories
  useEffect(() => {
    if(!authData?.id) return;
    setLoading(true);
    setFull(false);
    getWithAuth(
      `trips?userId=${authData.id}&sort=-timestamp&limit=10&filter[q]=${search}`,
    )
      .then(({data}) => {
        if (data.length === 0) setFull(true);
        setItems(data);
      })
      .catch(() => {
        // TODO: add error handling
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authData, search]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if(!authData?.id) return;
    if (full) return;
    setLoading(true);
    getWithAuth(
      `trips?userId=${authData.id}&sort=-timestamp&offset=${items.length}&limit=10&filter[q]=${search}`,
    )
      .then(({data}) => {
        let tmp = JSON.parse(JSON.stringify(items));
        Array.prototype.push.apply(tmp, data);
        if (tmp.length === items.length) setFull(true);
        else setFull(false);
        setItems(tmp);
      })
      .catch(() => {
        // TODO: add error handling
      })
      .finally(() => {
        setLoading(false);
      });
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
        text1={`My Trip History`}
        text2={``}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
        {items.map(item => (
          <TripCardItem
            item={item}
            key={item.id}
            navigation={navigation}
            marginBottom={10}
          />
        ))}
        <LoadMore getData={getData} full={full} loading={loading} />
      </View>
    </GradientBackground>
  );
};
