import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/Card';
import {View, TouchableOpacity, Text} from 'react-native';
import {CustomText} from '../../components/texts/custom-text';
import Collapsible from 'react-native-collapsible';
import {Dropdown} from 'react-native-element-dropdown';
import Counter from 'react-native-counters';

export const SelectGuests = ({
  screen,
  data,
  guestTitle,
  adults,
  setAdults,
  start,
  min,
  max,
  guestFirstSuffix,
  guestSecondSuffix,
  children,
  minChild,
  maxChild,
  guestSubTitle,
  guestSubContent,
  setGuests,
}) => {
  const [expandGuests, setExpandGuests] = useState(true);
  const [totalChildren, setTotalChildren] = useState(0);

  const plusIcon = isPlusDisabled => {
    return <Icon name="add" size={13} color={'#4169e1'} />;
  };

  const minusIcon = isDisabled => {
    return <Icon name="remove" size={13} color={'#4169e1'} />;
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

  useEffect(() => {
    if (screen === 'Homestay') setGuests(adults + children.length);
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 2,
            }}>
            <Text style={{fontWeight: '400', fontSize: 11, color: 'black'}}>
              {guestTitle}
            </Text>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 12}}>
              {adults} {guestFirstSuffix}{' '}
              {children.length != 0 ? children.length : ''}{' '}
              {children.length != 0 ? guestSecondSuffix : ''}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandGuests}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 7,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 3,
            }}>
            <CustomText style={{fontSize: 12}}>{guestFirstSuffix}</CustomText>
            <Counter
              start={min}
              max={max}
              min={min}
              onChange={value => setAdults(value)}
              countTextStyle={{
                fontWeight: '500',
                color: '#4169e1',
              }}
              buttonStyle={{
                borderColor: '#4169e1',
                borderWidth: 2,
                minWidth: 25,
                minHeight: 25,
              }}
              buttonTextStyle={{margin: 0}}
              plusIcon={plusIcon}
              minusIcon={minusIcon}
            />
          </View>

          {(screen === 'Homestay' || screen === 'hotels') && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                }}>
                <CustomText style={{fontSize: 12}}>
                  {guestSecondSuffix}
                </CustomText>
                <Counter
                  start={minChild}
                  max={maxChild}
                  onChange={childrenAge}
                  buttonStyle={{
                    borderColor: '#4169e1',
                    borderWidth: 2,
                    minWidth: 25,
                    minHeight: 25,
                  }}
                  countTextStyle={{fontWeight: '500', color: '#4169e1'}}
                  plusIcon={plusIcon}
                  minusIcon={minusIcon}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  paddingTop: 6,
                }}>
                {children.length >= 1 && (
                  <View>
                    <CustomText
                      style={{
                        color: '#333',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {guestSubTitle}
                    </CustomText>
                  </View>
                )}
                {children.map((e, i) => {
                  return (
                    <View key={i}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingTop: 6,
                        }}>
                        <CustomText style={{fontSize: 12}}>
                          {guestSubContent} {e.item}
                        </CustomText>
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
                            minWidth: 100,
                            paddingLeft: 3,
                          }}
                          renderRightIcon={() => (
                            <Icon name="chevron-down" size={14}></Icon>
                          )}
                          selectedTextStyle={{fontSize: 12}}
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
                                <Text
                                  style={{fontSize: 12, textAlign: 'center'}}>
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
          )}
        </View>
      </Collapsible>
    </View>
  );
};
