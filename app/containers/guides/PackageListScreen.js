import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View, ScrollView, Text} from 'native-base';
import {PackageCardItem} from '../../components/PackageCardItem';
import {BackButton} from '../../components/BackButton';
import RoundButton from '../../components/RoundButton';

export const PackageListScreen = ({navigation, route}) => {
  const [item, setItem] = useState(route?.params?.item);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let tmp = 0;
    item.packages.forEach(p => {
      if (selected.indexOf(p.id) !== -1) tmp += p.price;
    });
    setPrice(tmp);
  }, [selected]);

  const toggleSelection = e => {
    const index = selected.indexOf(e);
    const tmp = JSON.parse(JSON.stringify(selected));
    if (index === -1) {
      tmp.push(e);
    } else {
      tmp.splice(index, 1);
    }
    setSelected(tmp);
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Self Customize" text2={``} />
        </View>
      </View>
      <ScrollView>
        {item &&
          item.packages.map(p => (
            <PackageCardItem
              item={p}
              key={p.id}
              navigation={navigation}
              selected={selected}
              setSelected={e => toggleSelection(e)}
              marginBottom={10}
            />
          ))}
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 15,
          }}
          bold
          fontSize={24}
          letterSpacing="sm"
          lineHeight="xs">
          Total Price : RM {price}
        </Text>
        <RoundButton
          onPress={() => {
            // TODO: Navigate to Checkout
            // navigation.navigate('PackageList', {
            //   item,
            // });
          }}
          title="Checkout"
          backgroundColor="#dc2626"
        />
      </ScrollView>
    </GradientBackground>
  );
};
