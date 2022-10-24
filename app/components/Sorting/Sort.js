import React, {useEffect, useState, useRef} from 'react';
import Card from '../../components/Card';
import {View, TouchableOpacity, Text} from 'react-native';
import {PriceSlider} from './PriceSlider';
import {TagSelection} from './TagSelection';

export const Sort = ({
  sortRoom,
  setSortRoom,
  setPrizeRange,
  setReload,
  minPriceValue,
  maxPriceValue,
  defaultMinValue,
  defaultMaxValue,
  roomNum,
  setRoomNum,
  // setMinPrizeRange,
  // maxPrizeRange,
  // setMaxPrizeRange,
  // setChildren,
  // setGuests,
}) => {
  const [minPrizeRange, setMinPrizeRange] = useState(defaultMinValue);
  const [maxPrizeRange, setMaxPrizeRange] = useState(defaultMaxValue);
  const [tag, setTag] = useState([]);

  const sorting = [
    {id: 1, label: 'Any'},
    {id: 2, label: '1'},
    {id: 3, label: '2'},
    {id: 4, label: '3'},
    {id: 5, label: '4'},
  ];



 

  const Search = () => {
    setPrizeRange([minPrizeRange, maxPrizeRange]);
    setRoomNum(tag.itemsSelected[0].id - 1);
    setReload(current => !current);
    console.log(tag.itemsSelected[0].id - 1);
    // let item = tag.itesSelected;
    // console.log(item[0].id);
  };
  return (
    <Card style={{marginBottom: 10, padding: 15}}>
      <View>
        <TagSelection
          tag={tag}
          setTag={setTag}
          // onPressExpandRoom={onPressExpandRoom}
          roomNum={roomNum}
          // expandRoom={expandRoom}
        />

        <PriceSlider
          // onPressExpandPrice={onPressExpandPrice}
          // expandPrice={expandPrice}
          setMinPrizeRange={setMinPrizeRange}
          setMaxPrizeRange={setMaxPrizeRange}
          maxPriceValue={maxPriceValue}
          minPriceValue={minPriceValue}
          minPrizeRange={minPrizeRange}
          maxPrizeRange={maxPrizeRange}
          defaultMinValue={defaultMinValue}
          defaultMaxValue={defaultMaxValue}
        />
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={Search}
          style={{
            backgroundColor: '#4169e1',
            width: '45%',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Search</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
