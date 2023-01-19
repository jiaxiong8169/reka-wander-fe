import React from 'react';
import Tab from '../../components/Tab';
// import SpotsImagesScreen from '../containers/spots/SpotsImagesScreen';
import SpotsImagesScreen from './SpotsImagesScreen';

export default function SpotsHomeScreen({navigation, route}) {
  return <SpotsImagesScreen navigation={navigation} route={route} />
  // <Tab style={{padding: 20}} navigation={navigation} route={route} />;
}
