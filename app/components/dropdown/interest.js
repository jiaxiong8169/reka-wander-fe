import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {useSelector, useDispatch} from 'react-redux';
import {setInterest} from '../../redux/Planner/actions';
import {useHttpCall} from '../../hooks/useHttpCall';

const MultiSelectExample = () => {
  const {interest} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();
  const {getWithoutAuth} = useHttpCall();

  const [items, setItems] = useState([]);

  useEffect(() => {
    getWithoutAuth('interests?sort=name').then(({data}) => {
      if (!!data) setItems(data);
    });
  }, []);

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
            children: items,
          },
        ]}
        IconRenderer={Icon}
        uniqueKey="id"
        subKey="children"
        selectText="Choose your interest"
        searchPlaceholderText="Search your interest"
        showDropDowns={false}
        readOnlyHeadings={true}
        onSelectedItemsChange={onSelect}
        selectedItems={interest}
        styles={{
          button: {backgroundColor: '#4169E1'},
          chipText: {color: 'red'},
          chipsWrapper: {color: 'red'},
          chipContainer: {borderColor: '#6fbae8'},
          parentChipContainer: {color: 'red'},
          chipText: {color: '#483D8B'},
          chipIcon: {color: '#6fbae8'},
        }}
        onPress={() => ref && ref.current && ref.current._toggleSelector()}
        modalWithTouchable={true}
      />
    </View>
  );
};

export default MultiSelectExample;
