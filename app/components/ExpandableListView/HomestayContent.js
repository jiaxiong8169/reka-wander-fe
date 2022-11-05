import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import {CustomText} from '../texts/custom-text';
import {Container} from '../DetailsContent/container';

export const HomestayExpandableList = props => {
  const [expand, setExpand] = useState(true);

  const onPressExpand = () => {
    setExpand(current => !current);
  };

  return (
    <View>
      <View
        style={[{
          borderColor: 'grey',
          borderBottomWidth: 1,
          paddingBottom: 25,
          paddingTop: 25,
        },props.containerStyle]}>
        <TouchableOpacity onPress={onPressExpand}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingBottom: 6,
            }}>
            <View
              style={[
                {
                  borderLeftColor: '#4169e1',
                  borderLeftWidth: 5,
                  borderRadius: 4,
                },
                props.subContainerView,
              ]}>
              <CustomText
                fontSize="2xl"
                style={[{lineHeight: 35, paddingLeft: 13},props.titleStyle]}>
                {props.type}
              </CustomText>
            </View>

            <Icon name="chevron-down" size={20} color={props.iconColor}></Icon>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={expand}>{props.children}</Collapsible>
      </View>
    </View>
  );
};
