import React, {useState,useEffect} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {View} from 'native-base';
import {PackageCardItem} from '../../components/PackageCardItem';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {CustomText} from '../../components/texts/custom-text';
import dayjs from 'dayjs';
import {useHttpCall} from '../../hooks/useHttpCall';

export const PackageListScreen = ({navigation, route}) => {
  const {id,item, startDate, endDate, totalDays} = route.params;
  const [selected, setSelected] = useState([]);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [packages, setPackages] = useState([]);
  const {getWithoutAuth} = useHttpCall();

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const toggleSelection = (e, obj) => {
    const tmp = JSON.parse(JSON.stringify(selected));
    const index = tmp.map(x => x.id).indexOf(e);
    if (index >= 0) {
      tmp.splice(index, 1);
    } else {
      tmp.push(obj);
    }
    setSelected(tmp);
  };

  useEffect(() => {
    // if (!id) return;
    
    console.log(id)
    let startDate = dayjs(startDate).format('YYYY-MM-DD')
    let endDate = dayjs(endDate).format('YYYY-MM-DD')
    console.log(startDate)
    console.log(endDate)
    getWithoutAuth(`reservations/availability?startDate=${startDate}&endDate=${endDate}&type=guide&id=${id}`)
      .then(({data}) => {
        setPackages(data);
        // console.log(rooms)
      })
      .catch(e => {
        console.log(e);
      });
      // console.log(rooms)
  }, []);

  return (
    <GradientBackground
      stickyHeader={true}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1="Self Customize"
        text2={``}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
        {packages.map((p,i) => {
            return (
              <PackageCardItem
                item={p}
                key={i}
                navigation={navigation}
                selected={selected.filter(x => x.id === p.id).length > 0}
                setSelected={toggleSelection}
                marginBottom={10}
              />
            );
          })}
        <CustomButton
          onPress={() => {
            if (selected.length === 0) {
              setIsModelPopUp(true);
            } else {
              navigation.navigate('Confirmation', {
                item,
                selected,
                startDate,
                endDate,
                totalDays
              });
            }
          }}
          colorScheme="secondary"
          style={{marginBottom: 40, marginTop: 30}}>
          Booking
        </CustomButton>
      </View>
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
        <ModelContent onPress={closeModel} buttonTitle={'Close'} style={{alignItems: 'center'}}>
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
