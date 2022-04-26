import React, {useEffect, useState} from 'react';
import CardItem from '../../components/CardItem';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {Text, Input, View, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';

export const EditHotel = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setLoading(true);
    setFull(false);
    getWithoutAuth(`hotels?sort=-avgRating&limit=10&filter[q]=${search}`).then(
      ({data}) => {
        setItems(data);
        setLoading(false);
      },
    );
  }, [search]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `hotels?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
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
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Hi" text2={`Welcome,`} />
        </View>
        <Text fontSize={17} color="rgb(117,157,246)">
          Here there is some suggestion for you.
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
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <ScrollView style={{marginTop: 10, marginBottom: 50}}>
        {items.map(item => (
          <CardItem
            item={item}
            key={item.id}
            navigation={navigation}
            type={'hotels'}
            marginBottom={10}
          />
        ))}
        <LoadMore getData={getData} full={full} loading={loading} />
      </ScrollView>
    </GradientBackground>
  );
};
