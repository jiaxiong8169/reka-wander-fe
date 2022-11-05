import {Image} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Card from './card';
import moment from 'moment';

export const RecommendedCardWithData = ({
  navigation,
  title,
  data,
  type,
  startDate,
  endDate,
}) => {
  return (
    <View>
      <Text
        style={{
          margin: 5,
          fontSize: 20,
          color: `#6A5ACD`,
          fontWeight: '600',
          fontFamily: 'sans-serif-light',
        }}>
        Recommended {title}
      </Text>
      <Card style={{marginVertical: 10}}>
        <View>
          {data.length === 0 && (
            <Text
              style={{
                fontSize: 15,
                color: '#000',
                fontFamily: 'sans-serif-light',
                textAlign: 'center',
              }}>
              None is Selected.
            </Text>
          )}
          {data.map((d,i) => (
            <RecommendedCardDetails
              key={i}
              navigation={navigation}
              perks={d.perks}
              url={d.thumbnailSrc}
              id={d.id}
              name={d.name}
              type={type}
              item={d}
              description={d?.description?.substring(0, 100) + '...'}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
        </View>
      </Card>
    </View>
  );
};

function RecommendedCardDetails({
  navigation,
  perks,
  url,
  id,
  name,
  type,
  description,
  item,
  startDate,
  endDate,
}) {
  const getTotalDays = () => {
    if (!startDate || !endDate) return 0;
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };

  return (
    <TouchableOpacity
      style={{margin: 4}}
      onPress={() => {
        if (type === 'vehicles') {
          navigation.navigate('CarRentalDetails', {
            item,
          });
          return;
        }
        if (type === 'homestays') {
          navigation.navigate('HomestayDetails', {
            item,
            checkInDate: moment(startDate).format('DD/MM/YYYY'),
            checkOutDate: moment(endDate).format('DD/MM/YYYY'),
            totalDays: getTotalDays(),
          });
          return;
        }
        navigation.navigate('SpotDetails', {
          type: type,
          id: id,
        });
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderColor: '#000',
          borderBottomWidth: 1,
          paddingBottom: 10,
          width: '100%',
        }}>
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
            borderRadius: 5,
            paddingRight: 8,
          }}
          alt="spot"
          source={{uri: url}}
        />

        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            marginLeft: 3,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
            }}>
            {name}
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: '#000',
            }}>
            {description}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            {perks !== '' && (
              <Text
                style={{
                  fontSize: 11,
                  color: '#000',
                }}>
                {perks}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
