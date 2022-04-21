import React from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {
  Input,
  VStack,
  Box,
  Heading,
  Divider,
  SearchIcon,
  Button,
  Badge,
  ScrollView,
  Text,
  Flex,
} from 'native-base';
import Card from '../../components/Card';
import {
  View,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import CardItem from '../../components/CardItem';
import RoundButton from '../../components/RoundButton';
import Tab from '../../components/Tab';
import filter from "lodash.filter";
import { ListItem, SearchBar } from "react-native-elements";
import Search from '../../components/Search';


const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);
const startScroll = 0;

export default function SpotsSearchManually({navigation}) {
  return (
          <Search></Search>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
  button: {
    borderRadius: 100,
  },
  card: {
    maxheight: '75%',
    width: '100%',
  },
  view: {
    backgroundColor: '#eee',
    width: itemWidth - 20, //20 is margin left and right
    margin: 10,
    height: 140,
    borderRadius: 10,
  },
});
