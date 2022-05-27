import React, {useEffect, useState} from 'react';
import CardItemWithEdit from '../../components/CardItemWithEdit';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View, ScrollView} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import {useSelector, useDispatch} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import {RefreshControl} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

export const EditScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type, fieldName, fieldNameObj} = route.params;
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const {tripPlan} = useSelector(state => state.plannerReducer);

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setLoading(true);
    setFull(false);
    getWithoutAuth(`${type}?sort=-avgRating&limit=10&filter[q]=${search}`).then(
      ({data}) => {
        if (data.length === 0) setFull(true);
        setItems(data);
        setLoading(false);
      },
    );
  }, [search, reload]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `${type}?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
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
          <BlueSubtitle text1={`Edit ${type}`} text2={``} />
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
      {items.map(item => (
        <CardItemWithEdit
          item={item}
          key={item.id}
          navigation={navigation}
          type={type}
          marginBottom={10}
          selected={tripPlan[fieldName]}
          toggleItemSelection={toggleItemSelection}
        />
      ))}
      <LoadMore getData={getData} full={full} loading={loading} />
    </GradientBackground>
  );
};
