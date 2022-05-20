import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View, ScrollView, Text} from 'native-base';
import {PackageCardItem} from '../../components/PackageCardItem';
import {BackButton} from '../../components/BackButton';
import RoundButton from '../../components/RoundButton';
import {useSelector, useDispatch} from 'react-redux';
import {setGuidesTotal, setPackages} from '../../redux/Guides/actions';
import {PackagesSelected} from './GuideSelectedPackages';
import Card from '../../components/card/card';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';

export const PackageListScreen = ({navigation, route}) => {
  const [item, setItem] = useState(route?.params?.item);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const {packages} = useSelector(state => state.guidesReducer);
  const {guideTotal} = useSelector(state => state.guidesReducer);
  const {guideLat} = useSelector(state => state.guidesReducer);
  const {guideLong} = useSelector(state => state.guidesReducer);
  const dispatch = useDispatch();
  const closeModel = () => {
    setIsModelPopUp(false);
  };
  useEffect(() => {
    let tmp = 0;
    item.packages.forEach(p => {
      if (selected.indexOf(p.id) !== -1) {
        tmp += p.price;
      }
    });
    setPrice(tmp);
    dispatch(setGuidesTotal(tmp));
  }, [selected]);

  const toggleSelection = (e, eObj) => {
    const indexSelected = selected.indexOf(e);
    let tmp = JSON.parse(JSON.stringify(selected));
    let tmpObj = JSON.parse(JSON.stringify(packages));
    if (tmp) {
      const index = tmpObj.findIndex(x => x.id === e);
      if (index === -1) {
        tmpObj.push(eObj);
        tmp.push(e);
      } else {
        tmpObj.splice(index, 1);
        tmp.splice(indexSelected, 1);
      }
      setSelected(tmp);
      dispatch(setPackages(tmpObj));
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Self Customize" text2={``} />
        </View>
      </View>
      {item &&
        item.packages.map(p => {
          return (
            <PackageCardItem
              item={p}
              key={p.id}
              navigation={navigation}
              selected={selected}
              setSelected={toggleSelection}
              marginBottom={10}
            />
          );
        })}
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
        Total Price : RM {guideTotal}
      </Text>
      <RoundButton
        onPress={() => {
          // TODO: Navigate to Checkout
          if (price == 0) {
            setIsModelPopUp(true);
          } else {
            navigation.navigate('Confirmation', {
              item,
            });
          }
        }}
        title="Checkout"
        backgroundColor="#dc2626"
        style={{marginBottom: 40}}
      />
      <Modal
        isVisible={isModelPopUp}
        onBackdropPress={closeModel}
        onSwipeComplete={closeModel}
        useNativeDriverForBackdrop
        swipeDirection={['left', 'right', 'up', 'down']}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}>
        <ModelContent onPress={closeModel} buttonTitle={'Close'}>
          <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
          <Text>
            Opps, you did not select any tour guide yet.
            Please select at least one tour guide plan to proceed to the next step.
            
          </Text>
        </ModelContent>
      </Modal>
    </GradientBackground>
  );
};
