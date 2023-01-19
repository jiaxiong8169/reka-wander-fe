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
// // import {useSelector, useDispatch} from 'react-redux';
// import {setUserLongLat, setUserDestination} from '../../redux/Planner/actions';
// import {getLocationPermissionAndExecute} from '../../utils/location-utils';
// import MapView, {Marker, Circle} from 'react-native-maps';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {CustomButton} from '../../components/CustomButton';
// import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
// import GradientBackground from '../../components/GradientBackground';
// import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';
// import {TripProgress} from '../../components/stepper/progressBar';

// export const PlannerSelectDestination = ({navigation, route}) => {
//   //   const {longitude, latitude} = useSelector(state => state.plannerReducer);
//   const {tripName} = route.params;
//   const [search, setSearch] = useState('');
//   const [region, setRegion] = useState({
//     latitude: 5.5619733,
//     longitude: 118.0034433,
//     latitudeDelta: 5,
//     longitudeDelta: 4,
//   });
//   //   const [longitude, latitude]
//   const [longitude, setLongitude] = useState(0);
//   const [latitude, setLatitude] = useState(0);
//   const [destination, setDestination] = useState('');
//   const [progess, setProgress] = useState(0.11);
//   //   const dispatch = useDispatch();

//   // get location feature
//   const getLocation = () => {
//     getLocationPermissionAndExecute(
//       position => {
//         // set the longitude and longitude
//         setLongitude(position.coords.longitude);
//         setLatitude(position.coords.latitude);
//         // dispatch(
//         //   setUserLongLat(position.coords.longitude, position.coords.latitude),
//         // );
//         // update region
//         setRegion(prev => ({
//           ...prev,
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         }));
//       },
//       () => {
//         // location failed, navigate to MyHome
//         navigation.navigate('MyHome');
//       },
//     );
//   };

//   const geocodeByName = () => {
//     //here api
//     //api key belongs to nic0
//     if (!search) return;
//     const url = `https://geocode.search.hereapi.com/v1/geocode?q=${search}&limit=1&apiKey=xjMLk-nY3LGNoIEdTQnh53EMb5TbZVmo10tdpYNFVss`;
//     fetch(url)
//       .then(res => res.json())
//       .then(resJson => {
//         if (resJson.items.length > 0) {
//           // update with the first item
//           setLatitude(resJson.items[0].position.lat);
//           setLongitude(resJson.items[0].position.lng);
//           //   dispatch(
//           //     setUserLongLat(
//           //       resJson.items[0].position.lng,
//           //       resJson.items[0].position.lat,
//           //     ),
//           //   );
//           // update region
//           setRegion(prev => ({
//             ...prev,
//             latitude: resJson.items[0].position.lat,
//             longitude: resJson.items[0].position.lng,
//           }));
//         }
//       })
//       .catch(e => {
//         console.log('Error in geocodeByName', e);
//       });
//   };

//   const getAddressFromCoordinates = (lat, long) => {
//     //here api
//     //api key belongs to nic0
//     const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${lat}%2C${long}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=xjMLk-nY3LGNoIEdTQnh53EMb5TbZVmo10tdpYNFVss`;
//     fetch(url)
//       .then(res => res.json())
//       .then(resJson => {
//         if (
//           resJson &&
//           resJson.Response &&
//           resJson.Response.View &&
//           resJson.Response.View[0] &&
//           resJson.Response.View[0].Result &&
//           resJson.Response.View[0].Result[0]
//         ) {
//           setDestination(
//             resJson.Response.View[0].Result[0].Location.Address.Label,
//           );
//           //   dispatch(
//           //     setUserDestination(
//           //       resJson.Response.View[0].Result[0].Location.Address.Label,
//           //     ),
//           //   );
//         }
//       })
//       .catch(e => {
//         console.log('Error in getAddressFromCoordinates', e);
//       });
//   };

//   useEffect(() => {
//     setProgress(0.22);
//   }, []);
//   // on enter the screen, set long lat to user's current location
//   useEffect(() => {
//     getAddressFromCoordinates(latitude, longitude);
//     if (!longitude && !latitude) getLocation();
//     else
//       setRegion(prev => ({
//         ...prev,
//         latitude: latitude,
//         longitude: longitude,
//       }));
//   }, [longitude, latitude]);

//   return (
//     <GradientBackground>
//       <ScrollView
//         nestedScrollEnabled={true}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={{flexGrow: 1}}
//         showsVerticalScrollIndicator={false}>
//         <View style={{justifyContent: 'center', alignContent: 'center'}}>
//           <TripProgress completion={'20%'} progress={progess} />
//           <InsertDetailsCard width={'90%'}>
//             <View style={styles.body_container}>
//               <Text style={styles.question}>Select a destination</Text>
//               <CustomTextInput
//                 onChangeText={v => setSearch(v)}
//                 placeholder="Search location..."
//                 value={search}
//                 // autoFocus={true}
//                 startAdornment={
//                   <Icon
//                     style={{marginLeft: 10}}
//                     size={20}
//                     color="#BDBDBD"
//                     name="search"
//                   />
//                 }
//               />
//               <CustomButton size="xs" onPress={() => geocodeByName()}>
//                 Go To Location
//               </CustomButton>

//               <MapView
//                 region={region}
//                 style={{
//                   width: '100%',
//                   height: 200,
//                   marginTop: 10,
//                 }}>
//                 <Circle
//                   center={{latitude, longitude}}
//                   radius={300000}
//                   fillColor="rgba(25, 118, 210,0.3)"
//                 />
//                 <Marker
//                   draggable
//                   coordinate={{latitude, longitude}}
//                   title="Your Location"
//                   description="Drag the marker to change your location."
//                   onDragEnd={e => {
//                     // set the longitude and longitude
//                     setLatitude(e.nativeEvent.coordinate.latitude);
//                     setLongitude(e.nativeEvent.coordinate.longitude);
//                     // dispatch(
//                     //   setUserLongLat(
//                     //     e.nativeEvent.coordinate.longitude,
//                     //     e.nativeEvent.coordinate.latitude,
//                     //   ),
//                     // );
//                   }}
//                 />
//               </MapView>
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
//                 navigation.navigate('PlannerTripPax', {
//                   tripName,
//                   longitude,
//                   latitude,
//                   destination,
//                 });
//                 console.log(longitude, latitude,destination);
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
//     // width: '100%',
//   },
//   question: {
//     color: '#000000',
//     fontSize: 24,
//     fontFamily: 'sans-serif-medium',
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });
