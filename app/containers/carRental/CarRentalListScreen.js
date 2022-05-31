import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, RefreshControl} from 'react-native';
import {BackButton} from '../../components/BackButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../components/Card';
import {LoadMore} from '../../components/LoadMore';
import CarCardItem from '../../components/CarCardItem';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useDispatch, useSelector} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

export const CarRentalListScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const fieldName = route?.params?.fieldName;
  const fieldNameObj = route?.params?.fieldNameObj;
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const [reload, setReload] = useState(false);
  const {getWithoutAuth} = useHttpCall();

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `vehicles?sort=-avgRating&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      setItems(data);
      setLoading(false);
      if (data.length === 0) setFull(true);
    });
  }, [search, reload]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `vehicles?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      let tmp = JSON.parse(JSON.stringify(items));
      Array.prototype.push.apply(tmp, data);
      if (tmp.length === items.length) setFull(true);
      else setFull(false);
      setItems(tmp);
      setLoading(false);
    });
  };

  const toggleItemSelection = (v, vObj) => {
    let tmp = JSON.parse(JSON.stringify(tripPlan[fieldName]));
    let tmpObj = JSON.parse(JSON.stringify(tripPlan[fieldNameObj]));
    if (tmp) {
      // for array
      const index = tmpObj.findIndex(x => x.id === v);
      if (index !== -1) {
        tmpObj.splice(index, 1);
      } else {
        tmpObj.push(vObj);
      }
      tmp = tmpObj.map(obj => obj.id);
    } else {
      // for undefined
      tmp = v;
      tmpObj = vObj;
    }
    dispatch(setTripPlanbyFieldName(fieldName, tmp));
    dispatch(setTripPlanbyFieldName(fieldNameObj, tmpObj));
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
          <BlueSubtitle text1="Hi Welcome," text2={`Rent Your Car`} />
        </View>
      </View>

      <CustomTextInput
        placeholder="Search Here..."
        value={search}
        onChangeText={t => setSearch(t)}
        startAdornment={
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
          <CarCardItem
            key={item.id}
            name={item.name}
            price={item.price}
            thumbnailSrc={item.thumbnailSrc}
            item={item}
            onPress={() => navigation.navigate('CarRentalDetails', {item})}
            withEdit={!!fieldName && !!fieldNameObj}
            selected={tripPlan[fieldName]}
            toggleItemSelection={toggleItemSelection}
          />
        ))}
        <LoadMore getData={getData} full={full} loading={loading} />
      </Card>
    </GradientBackground>
  );
};
