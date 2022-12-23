// import StepIndicator from 'react-native-step-indicator';
// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// export const TripProgressStepIndicator = ({position}) => {
//   const {width} = Dimensions.get('window');
//   const [currentPage, setCurrentPage] = React.useState < number > 0;
//   const onStepPress = (position: number) => {
//     setCurrentPage(position);
//   };

//   const getStepIndicatorIconConfig = ({
//     position,
//     stepStatus,
//   }: {
//     position: number;
//     stepStatus: string;
//   }) => {
//     const iconConfig = {
//       name: 'feed',
//       color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
//       size: 15,
//     };
//     switch (position) {
//       case 0: {
//         iconConfig.name = 'shopping-cart';
//         break;
//       }
//       case 1: {
//         iconConfig.name = 'location-on';
//         break;
//       }
//       case 2: {
//         iconConfig.name = 'assessment';
//         break;
//       }
//       case 3: {
//         iconConfig.name = 'payment';
//         break;
//       }
//       case 4: {
//         iconConfig.name = 'track-changes';
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//     return iconConfig;
//   };

//   const renderLabel = ({
//     position,
//     label,
//     currentPosition,
//   }: {
//     position: number,
//     stepStatus: string,
//     label: string,
//     currentPosition: number,
//   }) => {
//     return (
//       <Text
//         style={
//           position === currentPosition
//             ? styles.stepLabelSelected
//             : styles.stepLabel
//         }>
//         {label}
//       </Text>
//     );
//   };

//   const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

//   return (
//     <View>
//       <View>
//         <Text style={{fontWeight: '300', fontSize: 40, color: `#4169E1`}}>
//           Hi{' '}
//           <Text
//             style={{
//               fontWeight: 'bold',
//               fontFamily: 'sans-serif-light',
//             }}>
//             Welcome,
//           </Text>
//         </Text>
//         <Text style={{fontSize: 15, color: `#4169E1`}}>
//           Create your destiny
//         </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//         }}>
//         <StepIndicator
//           customStyles={styles.indicatorStyles}
//           currentPosition={currentPage}
//           labels={['Account', 'Profile', 'Band', 'Membership', 'Dashboard']}
//           renderLabel={renderLabel}
//           onPress={onStepPress}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   indicatorStyles: {
//     stepIndicatorSize: 20,
//     currentStepIndicatorSize: 30,
//     separatorStrokeWidth: 3,

//     // currentStepStrokeWidth: 5,
//     separatorFinishedColor: '#4aae4f',
//     separatorUnFinishedColor: '#a4d4a5',
//     stepIndicatorFinishedColor: '#4aae4f',
//     stepIndicatorUnFinishedColor: '#a4d4a5',
//     stepIndicatorCurrentColor: '#ffffff',
//     // stepIndicatorLabelFontSize: 15,
//     // currentStepIndicatorLabelFontSize: 15,
//     // stepIndicatorLabelCurrentColor: '#000000',
//     // stepIndicatorLabelFinishedColor: '#ffffff',
//     // stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
//     // labelColor: '#666666',
//     // labelSize: 12,
//     // currentStepLabelColor: '#4aae4f',
//   },
// });
