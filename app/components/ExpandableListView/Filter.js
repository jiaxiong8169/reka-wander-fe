import React, {useEffect, useState, useRef} from 'react';
import Card from '../../components/Card';
import {View, TouchableOpacity, Text} from 'react-native';
import {SelectDates} from '../../components/Filter/SelectDates';
import {SelectGuests} from '../../components/Filter/SelectGuests';
import {TagSelection} from '../Sorting/TagSelection';
import {PriceSlider} from '../Sorting/PriceSlider';

export const Filter = ({
  screen,
  //selectDates
  dateTitle,
  dateLabelStart,
  dateLabelEnd,
  startDate,
  setStartDate,
  EndDate,
  setEndDate,
  setTotalDays,
  //selectGuests
  guestData,
  guestTitle,
  adults,
  setAdults,
  min,
  max,
  guestFirstSuffix,
  guestSecondSuffix,
  children,
  minChild,
  maxChild,
  setChildren,
  guestSubTitle,
  guestSubContent,
  setGuests,
  //search
  setReload,
  //selectTagRoom
  roomData,
  roomTag,
  setRoomTag,
  roomNum,
  setRoomNum,
  //selectTagTransmission
  transmissionData,
  transmissionTag,
  settransmissionTag,
  transmission,
  setTransmission,
  //selectTagProperty
  propertyData,
  propertyTag,
  setPropertyTag,
  propertyType,
  setPropertyType,
  //selectTagCarType
  carTypeData,
  carTypeTag,
  setCarTypeTag,
  carType,
  setCarType,
  //selectTagInterest
  interestData,
  interestTag,
  setInterestTag,
  interest,
  setInterest,

  setPriceValueRange,
  minPriceValue,
  maxPriceValue,
  defaultMinValue,
  defaultMaxValue,
}) => {
  const [minPriceRange, setMinPriceRange] = useState(defaultMinValue);
  const [maxPriceRange, setMaxPriceRange] = useState(defaultMaxValue);

  const Search = () => {
    setPriceValueRange([minPriceRange, maxPriceRange]);
    setReload(current => !current);
    if (screen == 'Homestay') {
      setRoomNum(roomTag.itemsSelected[0].id - 1);
      setPropertyType(propertyTag.itemsSelected[0].label);
    }
    if (screen == 'Car') {
      setTransmission(transmissionTag.itemsSelected[0].label);
      setCarType(carTypeTag.itemsSelected[0].label);
    }
    if (screen == 'hotels') {
      setRoomNum(roomTag.itemsSelected[0].id - 1);
      // setPropertyType(propertyTag.itemsSelected[0].label);
    }
    if (screen == 'Guide') {
      
      setInterest(interestTag.itemsSelected);
      console.log(interest)
      // setPropertyType(propertyTag.itemsSelected[0].label);
    }
  };

  return (
    <Card key={screen} style={{marginBottom: 10, padding: 15}}>
      {screen === 'Homestay' ? (
        <View key={0}>
          <SelectDates
            title={dateTitle}
            labelStart={dateLabelStart}
            labelEnd={dateLabelEnd}
            startDate={startDate}
            setStartDate={setStartDate}
            EndDate={EndDate}
            setEndDate={setEndDate}
            setTotalDays={setTotalDays}
          />

          <SelectGuests
            screen={screen}
            data={guestData}
            guestTitle={guestTitle}
            adults={adults}
            setAdults={setAdults}
            guestFirstSuffix={guestFirstSuffix}
            guestSecondSuffix={guestSecondSuffix}
            min={min}
            max={max}
            children={children}
            minChild={minChild}
            maxChild={maxChild}
            setChildren={setChildren}
            guestSubTitle={guestSubTitle}
            guestSubContent={guestSubContent}
            setGuests={setGuests}
          />

          <View>
            <TagSelection
              title={'Select Number of Bedrooms'}
              data={roomData}
              setTag={setRoomTag}
              values={roomNum}
              suffix={'room(s)'}
              label={'Number of Rooms'}
              predefinedIndex={0}
            />
            <TagSelection
              title={'Select Property Type'}
              data={propertyData}
              label={'Property Type'}
              setTag={setPropertyTag}
              values={propertyType}
              predefinedIndex={1}
            />
          </View>
          <PriceSlider
            step={100}
            setMinPriceRange={setMinPriceRange}
            setMaxPriceRange={setMaxPriceRange}
            maxPriceValue={maxPriceValue}
            minPriceValue={minPriceValue}
            minPriceRange={minPriceRange}
            maxPriceRange={maxPriceRange}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />
        </View>
      ) : screen === 'hotels' ? (
        <View key={1}>
          <SelectDates
            title={dateTitle}
            labelStart={dateLabelStart}
            labelEnd={dateLabelEnd}
            startDate={startDate}
            setStartDate={setStartDate}
            EndDate={EndDate}
            setEndDate={setEndDate}
            setTotalDays={setTotalDays}
          />
          <SelectGuests
            screen={screen}
            data={guestData}
            guestTitle={guestTitle}
            adults={adults}
            setAdults={setAdults}
            guestFirstSuffix={guestFirstSuffix}
            guestSecondSuffix={guestSecondSuffix}
            min={min}
            max={max}
            children={children}
            minChild={minChild}
            maxChild={maxChild}
            setChildren={setChildren}
            guestSubTitle={guestSubTitle}
            guestSubContent={guestSubContent}
            setGuests={setGuests}
          />
          <PriceSlider
            step={100}
            setMinPriceRange={setMinPriceRange}
            setMaxPriceRange={setMaxPriceRange}
            maxPriceValue={maxPriceValue}
            minPriceValue={minPriceValue}
            minPriceRange={minPriceRange}
            maxPriceRange={maxPriceRange}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />

          <View>
            <TagSelection
            
            type={'single'}
              title={'Select Number of Bedrooms'}
              data={roomData}
              setTag={setRoomTag}
              values={roomNum}
              suffix={'room(s)'}
              label={'Number of Rooms'}
              predefinedIndex={0}
            />
          </View>
        </View>
      ) : screen === 'Car' ? (
        <View key={2}>
          <SelectDates
            title={dateTitle}
            labelStart={dateLabelStart}
            labelEnd={dateLabelEnd}
            startDate={startDate}
            setStartDate={setStartDate}
            EndDate={EndDate}
            setEndDate={setEndDate}
            setTotalDays={setTotalDays}
          />
          <SelectGuests
            screen={screen}
            data={guestData}
            guestTitle={guestTitle}
            adults={adults}
            setAdults={setAdults}
            min={min}
            max={max}
            guestFirstSuffix={guestFirstSuffix}
            children={children}
          />
          <TagSelection
            title={'Select Transmission'}
            data={transmissionData}
            setTag={settransmissionTag}
            values={transmission}
            suffix={''}
            label={'Transmission'}
            predefinedIndex={0}
          />
          <TagSelection
          type={'single'}
            title={'Select Car Type'}
            data={carTypeData}
            setTag={setCarTypeTag}
            values={carType}
            suffix={''}
            label={'Car Type'}
            predefinedIndex={0}
          />
          <PriceSlider
            step={50}
            setMinPriceRange={setMinPriceRange}
            setMaxPriceRange={setMaxPriceRange}
            maxPriceValue={maxPriceValue}
            minPriceValue={minPriceValue}
            minPriceRange={minPriceRange}
            maxPriceRange={maxPriceRange}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />
        </View>
      ) : screen === 'Guide' ? (
        <View key={3}>
          <SelectDates
            title={dateTitle}
            labelStart={dateLabelStart}
            labelEnd={dateLabelEnd}
            startDate={startDate}
            setStartDate={setStartDate}
            EndDate={EndDate}
            setEndDate={setEndDate}
            setTotalDays={setTotalDays}
          />
          <PriceSlider
            step={50}
            setMinPriceRange={setMinPriceRange}
            setMaxPriceRange={setMaxPriceRange}
            maxPriceValue={maxPriceValue}
            minPriceValue={minPriceValue}
            minPriceRange={minPriceRange}
            maxPriceRange={maxPriceRange}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
          />

          <TagSelection
            type={'multiple'}
            title={'Select Travel Interest'}
            data={interestData}
            setTag={setInterestTag}
            values={interest}
            suffix={''}
            label={'Travel Interest'}
            predefinedIndex={0}
          />
        </View>
      ) : (
        <PriceSlider
          step={5}
          setMinPriceRange={setMinPriceRange}
          setMaxPriceRange={setMaxPriceRange}
          maxPriceValue={maxPriceValue}
          minPriceValue={minPriceValue}
          minPriceRange={minPriceRange}
          maxPriceRange={maxPriceRange}
          defaultMinValue={defaultMinValue}
          defaultMaxValue={defaultMaxValue}
        />
      )}

      {/* {screen === 'hotels' && (
        
      )} */}

      {/* {screen === 'Car' && (
        
      )} */}

      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity
          onPress={Search}
          style={{
            backgroundColor: '#4169e1',
            width: '35%',
            alignItems: 'center',
            padding: 6,
            marginTop: 13,
            borderRadius: 10,
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 13}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
