// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';
// import Modal from 'react-native-modal';
// import ModelContent from '../../components/Modal/ModalContent';
// import GradientBackground from '../../components/GradientBackground';
// import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';
// import {TripProgress} from '../../components/stepper/progressBar';
// import dayjs from 'dayjs';

// export const ChooseTripDates = ({navigation, route}) => {
//   const {tripName, longitude, latitude, destination, pax} = route.params;
//   const [isModalPopUp, setIsModalPopUp] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const minDate = new Date();
//   const maxDate = new Date(minDate.getFullYear + 2, 12, 31);
//   const [progess, setProgress] = useState(0.33);

//   useEffect(() => {
//     setProgress(0.44);
//   });

//   const closeModal = () => {
//     setIsModalPopUp(false);
//   };

//   const onDateChange = (date, type) => {
//     let dates = dayjs(date).format();
//     if (type === 'END_DATE') setEndDate(dates);
//     else {
//       setStartDate(date);
//       setEndDate(null);
//       console.log(typeof dates);
//       console.log(dates);
//     }
//   };
//   //   {dayjs(startDate).format('DD/MM/YYYY')} -{' '}
//   //               {dayjs(EndDate).format('DD/MM/YYYY')}
//   const width = Dimensions.get('window').width;

//   return (
//     <GradientBackground>
//       <ScrollView
//         nestedScrollEnabled={true}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{flexGrow: 1}}
//         showsVerticalScrollIndicator={false}>
//         <View
//           style={{
//             justifyContent: 'center',
//             alignContent: 'center',
//             marginBottom: 30,
//           }}>
//           <TripProgress completion={'40%'} progress={progess} />
//           <InsertDetailsCard width={'85%'}>
//             <View style={styles.body_container}>
//               <Text style={styles.question}>How many days?</Text>
//               <View>
//                 <CalendarPicker
//                   width={width - 100}
//                   //   style={styles.container}
//                   minDate={minDate}
//                   maxDate={maxDate}
//                   selectedDayColor="#4169E1"
//                   allowBackwardRangeSelect={true}
//                   selectedDayTextColor="#FFFFFF"
//                   allowRangeSelection={true}
//                   onDateChange={onDateChange}
//                   restrictMonthNavigation={true}
//                   textStyle={{fontSize: 13}}
//                   previousTitleStyle={{fontSize: 14}}
//                   nextTitleStyle={{fontSize: 14}}
//                   monthTitleStyle={{fontSize: 16}}
//                   yearTitleStyle={{fontSize: 16}}
//                   //   selectedStartDate={formattedStartDate}
//                   //   selectedEndDate={formattedEndDate}
//                 />
//               </View>
//               {/* <Calendar /> */}
//             </View>

//             <TouchableOpacity onPress={() => setIsModalPopUp(true)}>
//               <Text style={{paddingTop: 15, color: 'blue'}}>
//                 Click me for Instructions
//               </Text>
//               <Modal
//                 isVisible={isModalPopUp}
//                 onBackdropPress={closeModal}
//                 onSwipeComplete={closeModal}
//                 useNativeDriverForBackdrop
//                 swipeDirection={['left', 'right', 'up', 'down']}
//                 animationIn="zoomInDown"
//                 animationOut="zoomOutUp"
//                 animationInTiming={700}
//                 animationOutTiming={700}
//                 backdropTransitionInTiming={700}
//                 backdropTransitionOutTiming={700}>
//                 <ModelContent onPress={closeModal} buttonTitle={'Close'}>
//                   <Text style={{fontSize: 20, marginBottom: 12}}>
//                     Instruction
//                   </Text>
//                   <Image
//                     source={require('../../assets/calender.gif')}
//                     style={{width: 220, height: 200}}
//                     alt="calendar"
//                   />
//                 </ModelContent>
//               </Modal>
//             </TouchableOpacity>
//           </InsertDetailsCard>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: '85%',
//               alignItems: 'center',
//               alignSelf: 'center',
//               marginBottom: 30,
//             }}>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.goBack();
//               }}
//               style={{
//                 height: 40,
//                 width: '40%',
//                 marginTop: 15,
//                 borderRadius: 20,
//                 backgroundColor: '#ff4500',
//                 justifyContent: 'center',
//               }}>
//               <Text style={{color: 'white', alignSelf: 'center', fontSize: 15}}>
//                 Previous
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('PlannerTripDates', {
//                   tripName,
//                   longitude,
//                   latitude,
//                   destination,
//                   pax,
//                   startDate,
//                   endDate,
//                 });
//                 console.log(
//                   longitude,
//                   latitude,
//                   destination,
//                   pax,
//                   startDate,
//                   endDate,
//                 );
//               }}
//               style={{
//                 height: 40,
//                 width: '40%',
//                 marginTop: 15,
//                 borderRadius: 20,
//                 backgroundColor: '#214fc6',
//                 // alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text style={{color: 'white', alignSelf: 'center', fontSize: 15}}>
//                 Next
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </GradientBackground>
//   );
//   // };
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 40,
//   },
//   body: {
//     marginBottom: 20,
//     marginTop: 30,
//     width: '100%',
//     flex: 1,
//   },
//   question: {
//     color: '#000000',
//     fontSize: 24,
//     fontFamily: 'sans-serif-medium',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   body_container: {
//     alignItems: 'center',
//     // width: '100%',
//   },
// });
