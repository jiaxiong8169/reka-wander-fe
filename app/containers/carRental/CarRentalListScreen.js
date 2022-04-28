import React from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
import {View, Dimensions, ScrollView, Image} from 'react-native';
import {Text, Input, Box, ZStack, Center} from 'native-base';
import {BackButton} from '../../components/BackButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../../components/Card';
import {LoadMore} from '../../components/LoadMore';
import CarCardItem from '../../components/CarCardItem';

const height = Dimensions.get('window').height;

export const CarRentalListScreen = ({navigation}) => {
  
  
  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Hi" text2={`Welcome,`} />
        </View>
        <Text fontSize={17} color="rgb(117,157,246)">
          Rent your car
        </Text>
      </View>
      <Input
        placeholder="Search Here..."
        width="100%"
        borderRadius="4"
        variant="filled"
        fontSize="14"
        // value={search}
        // onChangeText={t => setSearch(t)}
        shadow="5"
        marginBottom="3"
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />

      <Card style={{marginBottom: height - 380}}>
        <ScrollView>
        <CarCardItem
              name="BMW"
              price="300"
              thumbnailSrc="https://www.hyundai.com.my/images/find-a-car/all-vehicles/palisade-lx2.png"
            />
          <LoadMore />
        </ScrollView>
      </Card>
    </GradientBackground>
  );
};
