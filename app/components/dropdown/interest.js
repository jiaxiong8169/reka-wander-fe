import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useSelector, useDispatch} from 'react-redux';
import {setInterest} from '../../redux/Planner/actions';
import {setInterests} from '../../redux/Nearby/actions';
import {useHttpCall} from '../../hooks/useHttpCall';

const Interest = () => {
  const {interest} = useSelector(state => state.plannerReducer);
  const {interests} = useSelector(state => state.nearbyReducer);
  const dispatch = useDispatch();
  const {getWithoutAuth} = useHttpCall();

  useEffect(() => {
    if (!interests || interests.length === 0)
      getWithoutAuth('interests?sort=name').then(({data}) => {
        if (!!data) {
          // preprocess data to remove duplicates
          let visited = new Set();
          const result = [];
          data.forEach(d => {
            d.id = d.name;
            if (!visited.has(d.id)) {
              result.push(d);
              visited.add(d.id);
            }
          });
          dispatch(setInterests(result));
        }
      });
  }, [interests]);

  const onSelect = selectedItems => {
    dispatch(setInterest(selectedItems));
  };

  return (
    <View>
      <SectionedMultiSelect
        items={[
          {
            name: 'Travel Interest',
            id: 0,
            children: interests,
          },
        ]}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Choose your interest"
        searchPlaceholderText="Search your interest"
        showDropDowns={false}
        hideSearch
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelect}
        selectedItems={interest}
        itemBackground={'#273be2'}
        styles={{
          container: {
            alignSelf: 'center',
            width: '80%',
            marginVertical: 60,
            height: '10%',
          },
          itemText: {color: '#273be2', fontSize: 20},
          searchTextInput: {fontSize: 12},
          selectToggleText: {fontSize: 15},
          selectToggle: {marginBottom: 14, marginTop: 10},
          button: {backgroundColor: '#4169E1', padding: 0},
          chipText: {color: 'red', margin: 0},
          chipsWrapper: {color: 'red', padding: 0},
          chipContainer: {
            borderColor: '#6fbae8',
            paddingLeft: 5,
            // height: '55%',
            margin: 4,
          },
          chipText: {color: '#483D8B', padding: 0, fontSize: 12},
          chipIcon: {color: '#6fbae8', marginVertical: 0},
          item: {padding: 7, marginTop: 10},
        }}
        modalWithTouchable={true}
      />
    </View>
  );
};

export default Interest;
