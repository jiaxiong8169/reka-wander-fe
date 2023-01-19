import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {CustomTabs} from '../../components/CustomTabs';
import Card from '../../components/Card';
import {RefreshControl} from 'react-native';
import {GuideCardItem} from '../../components/GuideCardItem';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {Filter} from '../../components/ExpandableListView/Filter';
import {Sort} from '../../components/Sorting/Sort';
import Collapsible from 'react-native-collapsible';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {CustomText} from '../../components/texts/custom-text';
import moment from 'moment';
import dayjs from 'dayjs';

// list of available tabs
const tabs = [
  {id: 'popular', name: 'Popular'},
  {id: 'recom', name: 'Recom'},
  {id: 'new', name: 'New'},
];

export const GuideListScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [expandFilter, setExpandFilter] = useState(true);
  const [priceRange, setPriceRange] = useState([50, 3050]);
  const [sorting, setSorting] = useState('minPrice');
  const [priceValueRange, setPriceValueRange] = useState([100, 1500]);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const [tab, setTab] = useState('popular');
  const {getWithoutAuth} = useHttpCall();
  const [reload, setReload] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [interestTag, setInterestTag] = useState([]);
  const [interest, setInterest] = useState(['Nature']);
  const [initial, setInitial] = useState(0);
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const sortingdata = [
    {label: 'Price', value: 'minPrice'},
    {label: 'Rating', value: '-avgRating'},
    {label: 'Popularity', value: '-rateCount'},
  ];

  const filterInterest = [
    'Nature',
    'Leisure',
    'Advanture',
    'Culture',
    'Honeymoons',
    'Entertainment',
    'Hiking',
    'Outdoor',
  ];

  // on load, on search and on change tab, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    let query = `guides?sort=${sorting}&limit=10&filter[q]=${search}`;
    getWithoutAuth(query).then(({data}) => {
      setItems(data);
      setLoading(false);
      if (data.length === 0) setFull(true);
    });
  }, [reload, search, sorting]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    let query = `guides?sort=${sorting}&offset=${items.length}&limit=10&filter[q]=${search}`;
    getWithoutAuth(query).then(({data}) => {
      let tmp = JSON.parse(JSON.stringify(items));
      Array.prototype.push.apply(tmp, data);
      if (tmp.length === items.length) setFull(true);
      else setFull(false);
      setItems(tmp);
      setLoading(false);
    });
  };

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  return (
    <GradientBackground
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => setReload(!reload)}
        />
      }>
      <BlueSubtitle
        text1="Tour Guides"
        text2={``}
        style={{
          marginBottom: 10,
        }}
      />

      <CustomTextInput
        placeholder="Search Here..."
        value={search}
        onChangeText={t => setSearch(t)}
        startAdornment={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#23297a"
            name="magnify"
          />
        }
        endAdornment={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginRight: 0}}
              onPress={() => {
                setExpandFilter(current => !current);
              }}>
              <Icon
                style={{marginRight: 13}}
                size={23}
                color="#23297a"
                name="filter-variant"
              />
            </TouchableOpacity>
          </View>
        }
      />
      <Collapsible collapsed={expandFilter}>
        <Filter
          screen="Guide"
          //selectDates
          dateTitle={'Start/End Dates'}
          dateLabelStart={'Start Date'}
          dateLabelEnd={'End Date'}
          startDate={startDate}
          setStartDate={setStartDate}
          EndDate={endDate}
          setEndDate={setEndDate}
          setTotalDays={setTotalDays}
          //selectPriceRange
          minPriceValue={priceRange[0]}
          maxPriceValue={priceRange[1]}
          defaultMinValue={priceValueRange[0]}
          defaultMaxValue={priceValueRange[1]}
          setPriceValueRange={setPriceValueRange}
          //selectTagInterest
          interestData={filterInterest}
          interestTag={interestTag}
          setInterestTag={setInterestTag}
          interest={interest}
          setInterest={setInterest}
          //search
          setReload={setReload}
        />
      </Collapsible>
      <View style={{paddingBottom: 10}}>
        {expandFilter && (
          <Sort
            setSorting={setSorting}
            data={sortingdata}
            sorting={sorting}
            setInitial={setInitial}
            initial={initial}
          />
        )}
      </View>

      <Card style={{marginBottom: 10}}>
        {/* <CustomTabs
          tabs={tabs}
          tab={tab}
          setTab={setTab}
          style={{marginBottom: 10}}
        /> */}
        {items.map((item, i) => {
          let interested = interest.find(data => data === item.interest);
          if (
            item.price >= priceValueRange[0] &&
            item.price <= priceValueRange[1] &&
            interested != null
          )
            return (
              <GuideCardItem
                item={item}
                key={i}
                navigation={navigation}
                marginBottom={10}
                onPress={() => {
                  if (moment(startDate).isAfter(endDate) || moment(startDate).isSame(endDate)) {
                    setIsModelPopUp(true);
                  } else {
                    navigation.navigate('GuideDetails', {
                      id: item.id,
                      items: item,
                      guidePackage: item.packages,
                      totalDays,
                      startDate: startDate,
                      endDate: endDate,
                    });
                  }
                }}
              />
            );
        })}
        <Modal
          isVisible={isModelPopUp}
          onBackdropPress={closeModel}
          onSwipeComplete={closeModel}
          useNativeDriverForBackdrop
          swipeDirection={['left', 'right', 'up', 'down']}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={700}
          animationOutTiming={700}
          backdropTransitionInTiming={700}
          backdropTransitionOutTiming={700}>
          <ModelContent onPress={closeModel} buttonTitle={'Close'} style={{alignItems: 'center'}}>
            <CustomText fontSize="lg" style={{marginBottom: 12}}>
              Invalid Date
            </CustomText>
            <CustomText>
              Your start and end dates are invalid. Please make sure that
              the end date is not before start date.
            </CustomText>
            <CustomText style={{paddingTop: 10}}>
              To edit your start and end date, please tap on the
              <CustomText style={{fontWeight: 'bold', fontSize: 15}}>
                {' '}
                FILTER <Icon size={16} color="#23297a" name="filter-variant" />
              </CustomText>{' '}
              button beside the search bar.
            </CustomText>
          </ModelContent>
        </Modal>
        <LoadMore getData={getData} full={full} loading={loading} />
      </Card>
    </GradientBackground>
  );
};
