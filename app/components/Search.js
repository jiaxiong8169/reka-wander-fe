import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import filter from 'lodash.filter';
import CardItem from './CardItem';
import BlueSubtitle from './BlueSubtitle';
import GradientBackground from './GradientBackground';
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
import Card from './Card';
import {Rating} from 'react-native-ratings';
import RoundButton from './RoundButton';

const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);
const startScroll = 0;

const DATA = [
  {
    id: '1',
    itemName: 'Hotel',
  },
  {
    id: '2',
    itemName: 'Genting Hotel',
  },
  {
    id: '3',
    itemName: 'Yolo',
  },
  {
    id: '4',
    itemName: 'Testing',
  },
  {
    id: '5',
    itemName: 'Dummy Data',
  },
  {
    id: '6',
    itemName: 'Check',
  },
  {
    id: '7',
    itemName: 'Hotel Revana',
  },
  {
    id: '8',
    itemName: 'Hotel ali',
  },
  {
    id: '9',
    itemName: 'Hotel ABC',
  },
];

const Item = ({itemName}) => {
  return (
      <CardItem
    // imageSrc={require('../assets/home.jpg')}
    ratingPercentage={8.3}
    rating={'Good'}
    itemName={itemName}
    location={'Kinabalu'}
    category={'Hotel'}
    totalReviews={10}
    price={100}
    lessThanUsualPercentage={10}
    onPress={() => navigation.navigate('NearByDetails')}></CardItem>
  );
};

const renderItem = ({item}) => <Item itemName={item.itemName} />;
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: '',
    };
    this.arrayholder = DATA;
  }

  searchFunction = text => {
    const updatedData = this.arrayholder.filter(item => {
      const item_data = `${item.itemName.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({data: updatedData, searchValue: text});
  };

  render() {
    return (
      <ScrollView>
        <GradientBackground>
          <BlueSubtitle text1="Hi" text2="Melvin,"></BlueSubtitle>
          <Text fontSize={17} color="rgb(117,157,246)">
            Here there is some suggestion for you.
          </Text>
         <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
          inputContainerStyle={{backgroundColor: 'white'}}
          containerStyle={{backgroundColor: 'transparent'}}
        />
          <Card style={styles.card}>
             <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
            {/* <RoundButton title="Next" backgroundColor="#dc2626" /> */}
          </Card>
        </GradientBackground>
      </ScrollView>
    );
  }
}

export default Search;
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
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: '#f5f520',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
