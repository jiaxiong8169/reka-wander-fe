import React, {useEffect, useState} from 'react';
import CardItem from '../../components/CardItem';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {Text, Input, View, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {CustomTabs} from '../../components/CustomTabs';
import Card from '../../components/Card';
import {Dimensions} from 'react-native';

const height = Dimensions.get('window').height;

// list of available tabs
const tabs = [
  {id: 'popular', name: 'Popular'},
  {id: 'recom', name: 'Recom'},
  {id: 'new', name: 'New'},
];

export const GuideListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const [tab, setTab] = useState('attractions');
  const {getWithoutAuth} = useHttpCall();

  // on load, on search and on change tab, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(`guides?sort=-avgRating&limit=10&filter[q]=${search}`).then(
      ({data}) => {
        setItems(data);
        setLoading(false);
      },
    );
  }, [search, tab]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `guides?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
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
          <BlueSubtitle text1="Tour Guides" text2={``} />
        </View>
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
      <Card style={{marginBottom: height - 430}}>
        <CustomTabs
          tabs={tabs}
          tab={tab}
          setTab={setTab}
          style={{marginBottom: 10}}
        />
        <ScrollView>
          {items.map(item => (
            <CardItem
              item={item}
              key={item.id}
              navigation={navigation}
              type={tab}
              marginBottom={10}
            />
          ))}
          <LoadMore getData={getData} full={full} loading={loading} />
        </ScrollView>
      </Card>
    </GradientBackground>
  );
};
