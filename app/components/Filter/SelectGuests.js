import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/Card';
import {View, TouchableOpacity, Text} from 'react-native';
import {CustomText} from '../../components/texts/custom-text';
import Collapsible from 'react-native-collapsible';
import {Dropdown} from 'react-native-element-dropdown';
import Counter from 'react-native-counters';

export const SelectGuests = ({adults, setAdults, children, setGuests}) => {
  const [expandGuests, setExpandGuests] = useState(true);
  const [totalChildren, setTotalChildren] = useState(0);

  const plusIcon = isPlusDisabled => {
    return <Icon name="add" size={20} color={'#4169e1'} />;
  };

  const minusIcon = isDisabled => {
    return <Icon name="remove" size={20} color={'#4169e1'} />;
  };

  const onPressExpandGuests = () => {
    setExpandGuests(current => !current);
  };

  const childrenAge = value => {
    setTotalChildren(value);
    if (totalChildren <= value)
      children.push({id: value, key: value, item: value, ageOfChild: 12});
    else if (totalChildren >= value) children.pop();
  };

  const data = [
    {label: '1 years old', value: 1},
    {label: '2 years old', value: 2},
    {label: '3 years old', value: 3},
    {label: '4 years old', value: 4},
    {label: '5 years old', value: 5},
    {label: '6 years old', value: 6},
    {label: '7 years old', value: 7},
    {label: '8 years old', value: 8},
    {label: '9 years old', value: 9},
    {label: '10 years old', value: 10},
    {label: '11 years old', value: 11},
    {label: '12 years old', value: 12},
  ];

  useEffect(() => {
    setGuests(adults + children.length);
  }, [adults, children.length]);

  return (
    <View>
      <TouchableOpacity onPress={onPressExpandGuests}>
        <Card
          style={{
            backgroundColor: 'aliceblue',
            shadowColor: 'white',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: '400', fontSize: 12}}>How many guests</Text>
          <Text style={{fontWeight: '600', color: 'black', fontSize: 14}}>
            {adults} Adult(s) {children.length} Children
          </Text>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandGuests}>
        <View
          style={{
            flexDirection: 'column',
            paddingLeft: 10,
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <CustomText>Adult(s)</CustomText>
            <Counter
              start={1}
              max={12}
              min={1}
              onChange={value => setAdults(value)}
              countTextStyle={{fontWeight: '500', color: '#4169e1'}}
              buttonStyle={{
                borderColor: '#4169e1',
                borderWidth: 2,
              }}
              plusIcon={plusIcon}
              minusIcon={minusIcon}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <CustomText>Children</CustomText>
            <Counter
              start={0}
              max={12}
              onChange={childrenAge}
              buttonStyle={{
                borderColor: '#4169e1',
                borderWidth: 2,
              }}
              countTextStyle={{fontWeight: '500', color: '#4169e1'}}
              plusIcon={plusIcon}
              minusIcon={minusIcon}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              paddingLeft: 10,
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            {children.length >= 1 && (
              <View>
                <CustomText
                  style={{
                    color: '#333',
                    fontSize: 15,
                    fontWeight: '500',
                    // marginVertical: 13,
                  }}>
                  Chidlren's Ages
                </CustomText>
              </View>
            )}
            {children.map(e => {
              return (
                <View key={e.id} id={e.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                    }}>
                    <CustomText>Child {e.item}</CustomText>
                    <Dropdown
                      value={e.ageOfChild}
                      onChange={a => {
                        e = {...e, ageOfChild: a.value};
                        console.log(a.value);
                        children.splice(e.id - 1, 1, e);
                      }}
                      style={{
                        height: 25,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                        width: 120,
                        paddingBottom: 6,
                        paddingLeft: 3,
                      }}
                      renderRightIcon={() => (
                        <Icon name="chevron-down" size={14}></Icon>
                      )}
                      selectedTextStyle={{fontSize: 15}}
                      data={data}
                      search={false}
                      labelField="label"
                      valueField="value"
                      maxHeight={150}
                      itemContainerStyle={{
                        alignItems: 'center',
                      }}
                      renderItem={item => {
                        return (
                          <View
                            style={{
                              padding: 8,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 14, textAlign: 'center'}}>
                              {item.label}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Collapsible>
    </View>
  );
};
