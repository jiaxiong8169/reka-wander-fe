import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const width = Dimensions.get('window').width;

// import {useSelector, useDispatch} from 'react-redux';
// import {setStartDate, setEndDate} from '../../redux/Planner/actions';

export default class Calendar extends Component {
  // const Calender = () => {
  //   const {startDate} = useSelector(state => state.plannerReducer);
  //   const dispatch_startDate = useDispatch();

  //   const {endDate} = useSelector(state => state.plannerReducer);
  //   const dispatch_endDate = useDispatch();

  //   const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  //   const [selectedStartDate, setSelectedStartDate] = useState(startDate);

  //   const onDateChange = (date, type) => {
  //     if (type === 'END_DATE') {
  //       setSelectedEndDate(date);
  //       dispatch_endDate(setEndDate(selectedEndDate.format()));
  //     } else {
  //       setSelectedStartDate(date);
  //       dispatch_startDate(setStartDate(selectedStartDate.format()));
  //     }
  //   };
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,

        // dateRange: selectedEndDate.from(selectedStartDate, true),
      });
      // console.log(typeof selectedEndDate);
      //   console.log(dateRange);
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
      // console.log(typeof selectedStartDate);
    }
  }

  render() {
    const {selectedStartDate, selectedEndDate} = this.state;
    const minDate = new Date(); // Today
    const year = minDate.getFullYear();
    const maxDate = new Date(year + 2, 12, 31);
    const formattedStartDate = selectedStartDate
      ? selectedStartDate.format('YYYY-MM-DD')
      : '';
    const formattedEndDate = selectedEndDate
      ? selectedEndDate.format('YYYY-MM-DD')
      : '';

    return (
      <View style={styles.container}>
        <CalendarPicker
          width={width - 100}
          style={styles.container}
          minDate={minDate}
          maxDate={maxDate}
          selectedDayColor="#4169E1"
          selectedDayTextColor="#FFFFFF"
          allowRangeSelection={true}
          onDateChange={this.onDateChange}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: '400'}}>Start Date</Text>
          <Text style={{fontSize: 14, fontWeight: '400'}}>End Date</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 14, fontWeight: '400'}}>
            {formattedStartDate}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400'}}>
            {formattedEndDate}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    flex: 1,
  },
});
