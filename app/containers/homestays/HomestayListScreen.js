import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {Text, Input, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import Card from '../../components/Card';
import {RefreshControl, View} from 'react-native';
import {HomestayCardItem} from '../../components/HomestayCardItem';

export const HomestayListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `homestays?sort=-avgRating&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      setItems(data);
      setLoading(false);
    });
  }, [search, reload]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `homestays?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      let tmp = JSON.parse(JSON.stringify(items));
      Array.prototype.push.apply(tmp, data);
      if (tmp.length === items.length) setFull(true);
      else setFull(false);
      setItems(tmp);
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
      }>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Hi" text2={`Welcome,`} />
        </View>
        <Text fontSize={17} color="rgb(117,157,246)">
          Book a Homestay
        </Text>
      </View>

      <Input
        placeholder="Search Here..."
        width="100%"
        borderRadius="4"
        variant="filled"
        fontSize="14"
        value={search}
        onChangeText={t => setSearch(t)}
        shadow="5"
        marginBottom="3"
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <Card style={{marginBottom: 10}}>
        {items.map(item => (
          <HomestayCardItem
            key={item.id}
            name={item.name}
            price={item.minPrice}
            thumbnailSrc={item.thumbnailSrc}
            onPress={() =>
              navigation.navigate('HomestayDetails', {id: item.id})
            }
          />
        ))}
        <LoadMore getData={getData} full={full} loading={loading} />
      </Card>
    </GradientBackground>
  );
};
