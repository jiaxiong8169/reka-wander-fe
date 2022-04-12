import * as React from 'react';
import {View, Image} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import {Button, ChevronLeftIcon, Text, Badge} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import Card from '../../components/Card';
import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import {useHttpCall} from '../../hooks/useHttpCall';

export default function NearByCategoryScreen({navigation, route}) {
  const {type} = route.params;
  const {getWithoutAuth} = useHttpCall();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    getWithoutAuth(`${type}?sort=-avgRating`).then(({data}) => {
      if (!!data) setItems(data);
    });
  }, [type]);

  return (
    <GradientBackground>
      <View style={{flexDirection: 'row'}}>
        <ChevronLeftIcon
          color="gray.500"
          size="xl"
          mt="1"
          marginRight="2"
          onPress={() => navigation.goBack()}></ChevronLeftIcon>
        <BlueSubtitle
          text1={''}
          text2={type[0].toUpperCase() + type.substring(1)}
          style={{marginBottom: 20}}></BlueSubtitle>
      </View>
      <View>
        {items.map(item => (
          <Card style={{height: 150, flexDirection: 'row'}}>
            <Image
              style={{flex: 1, height: undefined, borderRadius: 5}}
              source={{uri: item.thumbnailSrc}}></Image>
            <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
              <View style={{flexDirection: 'row', flex: 2}}>
                <View style={{flex: 1}}>
                  <Text bold fontSize={14} letterSpacing="sm" lineHeight="xs">
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: 'auto',
                      marginTop: 2,
                    }}>
                    <Rating
                      imageSize={15}
                      ratingCount={5}
                      startingValue={item.avgRating}
                      readonly
                    />
                  </View>
                  <View style={styles.lineStyle} />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={require('../../assets/pin.png')}
                      tintColor={'#52525b'}
                    />
                    <Text marginLeft="1" fontSize={10} color="gray.600">
                      {item.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    {/* <Badge
                      _text={{
                        fontSize: 6,
                      }}
                      colorScheme="danger"
                      variant="solid"
                      style={{borderRadius: 100}}>
                      8.3
                    </Badge>
                    <Text bold marginLeft="1" fontSize={8} color="gray.600">
                      Excellent{' '}
                      <Text marginLeft="1" fontSize={8} color="gray.400">
                        (1199 reviews)
                      </Text>
                    </Text> */}
                    <Text marginLeft="1" fontSize={8} color="gray.400">
                      {item.reviews.length} reviews
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#D0ECFA',
                    height: undefined,
                    margin: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 8,
                  }}>
                  {/* <Text bg="blue.600" style={{padding: 2, textAlign: 'right'}}>
                    <Text
                      bold
                      fontSize={10}
                      color="white"
                      bg="blue.600"
                      px="3"
                      style={{padding: 3, textAlign: 'right'}}>
                      100% {'  '}
                      <Text
                        color="blue.600"
                        bg="white"
                        p="10"
                        m="20"
                        style={{padding: 3, margin: 10, textAlign: 'right'}}>
                        {' '}
                        Less than usual{' '}
                      </Text>
                    </Text>
                  </Text> */}
                  <View>
                    <Text
                      fontSize="12"
                      color="blue.600"
                      style={{textAlign: 'right'}}>
                      {item.perks}
                    </Text>
                    <Text
                      bold
                      lineHeight="xs"
                      fontSize="25"
                      color="blue.600"
                      style={{textAlign: 'right'}}>
                      RM 266
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                size="sm"
                padding="1"
                bg="blue.600"
                _pressed={{bg: 'blue.300', _text: {color: 'white'}}}
                onPress={() => {
                  navigation.navigate('NearByDetails', {
                    type: type,
                    id: item.id,
                  });
                }}>
                View Details
              </Button>
            </View>
          </Card>
        ))}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
});
