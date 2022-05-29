import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View} from 'native-base';
import {PackageCardItem} from '../../components/PackageCardItem';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {setGuidesTotal, setPackages} from '../../redux/Guides/actions';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {CustomText} from '../../components/texts/custom-text';

export const PackageListScreen = ({navigation, route}) => {
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const {packages} = useSelector(state => state.guidesReducer);
  const {guideTotal} = useSelector(state => state.guidesReducer);
  const dispatch = useDispatch();
  const closeModel = () => {
    setIsModelPopUp(false);
  };
  useEffect(() => {
    let tmp = 0;
    route?.params?.item.packages.forEach(p => {
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
      {route?.params?.item &&
        route?.params?.item.packages.map(p => {
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
      <CustomText
        style={{
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 15,
        }}
        bold
        fontSize="lg">
        Total Price : RM {guideTotal}
      </CustomText>
      <CustomButton
        onPress={() => {
          // TODO: Navigate to Checkout
          if (price == 0) {
            setIsModelPopUp(true);
          } else {
            navigation.navigate('Confirmation', {
              item: route?.params?.item,
            });
          }
        }}
        colorScheme="secondary"
        style={{marginBottom: 40}}>
        Checkout
      </CustomButton>
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
          <CustomText fontSize="lg" marginBottom="3">
            Opps!
          </CustomText>
          <CustomText>
            Opps, you did not select any tour guide yet. Please select at least
            one tour guide plan to proceed to the next step.
          </CustomText>
        </ModelContent>
      </Modal>
    </GradientBackground>
  );
};
