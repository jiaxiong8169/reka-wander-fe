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
// import SelectPax from '../../components/dropdown/Pax';
// import GradientBackground from '../../components/GradientBackground';
// import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';
// import {TripProgress} from '../../components/stepper/progressBar';

// export const TripPax = ({navigation, route}) => {
//   const {tripName, longitude, latitude, destination} = route.params;
//   const [pax, setPax] = useState(0);
//   const [progess, setProgress] = useState(0.22);

//   useEffect(() => {
//     setProgress(0.33);
//   });

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
//           <TripProgress completion={'30%'} progress={progess} />
//           <InsertDetailsCard width={'85%'}>
//             <View style={styles.body_container}>
//               <Text style={styles.question}>How many Pax?</Text>
//               <SelectPax min={1} max={12} setPax={setPax} />
//               <View style={{marginTop: 10}}>
//                 <Image
//                   source={require('../../assets/People.png')}
//                   style={{
//                     // padding: 1,
//                     aspectRatio: 1,
//                     width: '80%',
//                     resizeMode: 'contain',
//                     // alignItems: 'flex-end',
//                     height: undefined,
//                   }}
//                   alt="people"
//                 />
//               </View>
//             </View>
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
//                 });
//                 console.log(longitude, latitude,destination,pax);
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
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 40,
//   },
//   body: {
//     marginBottom: 20,
//     marginTop: 30,
//     width: '100%',
//   },
//   body_container: {
//     alignItems: 'center',
//   },
//   question: {
//     color: '#000000',
//     fontSize: 24,
//     fontFamily: 'sans-serif-medium',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });
