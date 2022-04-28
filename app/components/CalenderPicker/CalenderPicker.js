import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {connect} from 'react-redux';
import {setStartDate, setEndDate} from '../../redux/Planner/actions';
import moment from 'moment';

const width = Dimensions.get('window').width;

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.props.handleSetEndDate(date);
    } else {
      this.props.handleSetStartDate(date);
      this.props.handleSetEndDate(null);
    }
  }

  render() {
    const {startDate, endDate} = this.props;
    const minDate = new Date(); // Today
    const year = minDate.getFullYear();
    const maxDate = new Date(year + 2, 12, 31);
    const formattedStartDate = startDate
      ? moment(startDate).format('YYYY-MM-DD')
      : '';
    const formattedEndDate = endDate
      ? moment(endDate).format('YYYY-MM-DD')
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
          textStyle={{fontSize:13}}
          previousTitleStyle={{fontSize:14}}
          nextTitleStyle={{fontSize:14}}
          monthTitleStyle={{fontSize:16}}
          yearTitleStyle={{fontSize:16}}
          selectedStartDate={formattedStartDate}
          selectedEndDate={formattedEndDate}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: '400'}}>Start Date</Text>
          <Text style={{fontSize: 15, fontWeight: '400'}}>End Date</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 15, fontWeight: '400'}}>
            {formattedStartDate}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400'}}>
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
  },
});

function mapStateToProps(state) {
  const {startDate, endDate} = state.plannerReducer;
  return {startDate, endDate};
}

const mapDispatchToProps = dispatch => {
  return {
    handleSetStartDate: v => {
      dispatch(setStartDate(v));
    },
    handleSetEndDate: v => {
      dispatch(setEndDate(v));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
