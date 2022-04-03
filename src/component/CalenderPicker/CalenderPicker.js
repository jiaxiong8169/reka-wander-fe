import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Calendar extends Component {
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
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null,
            });
        }
    }

    render() {
        const { selectedStartDate, selectedEndDate } = this.state;
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
                {/* calendar size controlled in makeStyles.js 36 -> index.js 144
                day,month,year size in makeStyles.js

                */}
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
                    style={
                        { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
                    }>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>Start Date</Text>
                    {/* <Text style={{ fontSize: 14, fontWeight: 400,}}>Start Date{formattedStartDate}</Text> */}
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>End Date</Text>
                    {/* <Text style={{ fontSize: 14, fontWeight: 400,}}>End Date{formattedEndDate}</Text> */}
                </View>
                <View
                    style={
                       { flexDirection: 'row', justifyContent: 'space-between' }
                    }>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>
                        {formattedStartDate}
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '400' }}>
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



// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
// import CalendarPicker from 'react-native-calendar-picker';

// export default class Calendar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedStartDate: null,
//             selectedEndDate: null,
//         };
//         this.onDateChange = this.onDateChange.bind(this);
//     }

//     onDateChange(date, type) {
//         if (type === 'END_DATE') {
//             this.setState({
//                 selectedEndDate: date,
//             });
//         } else {
//             this.setState({
//                 selectedStartDate: date,
//                 selectedEndDate: null,
//             });
//         }
//     }

//     render() {
//         const { selectedStartDate, selectedEndDate } = this.state;
//         const minDate = new Date(); // Today
//         const maxDate = new Date(2025, 6, 3);
//         const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//         const endDate = selectedEndDate ? selectedEndDate.toString() : '';

//         return (
//             <View style={styles.container}>
//                 <CalendarPicker
//                     //   startFromMonday={true}
//                     // scrollable
//                     allowRangeSelection={true}
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     todayBackgroundColor="#f2e6ff"
//                     selectedDayColor="#7300e6"
//                     selectedDayTextColor="#FFFFFF"
//                     onDateChange={this.onDateChange}
//                 />

//                 <View>
//                     <Text>SELECTED START DATE:{startDate}</Text>
//                     <Text>SELECTED END DATE:{endDate}</Text>
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         marginTop: 100,
//     },
// });









// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TextInput,
//   Switch,
// } from 'react-native';
// import moment from 'moment';
// import CalendarPicker from 'react-native-calendar-picker';

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     let minDate = moment().subtract(15, 'day');
//     let day = minDate.clone();
//     let customDatesStyles = [];
//     for (let i = 0; i < 30; i++) {
//       customDatesStyles.push({
//         date: day.clone(),
//         // Random colors
//         style: {backgroundColor: '#'+('#00000'+(Math.random()*(64<<22)|32768).toString(16)).slice(-6)},
//         textStyle: {color: 'black'}, // sets the font color
//         containerStyle: [], // extra styling for day container
//       });
//       day.add(1, 'day');
//     }

//     this.state = {
//       customDatesStyles,
//       enableRangeSelect: false,
//       minDate,
//       maxDate: moment().add(90, 'day'),
//       minRangeDuration: "1",
//       maxRangeDuration: "5",
//       selectedStartDate: null,
//     };
//     this.onDateChange = this.onDateChange.bind(this);
//     this.clear = this.clear.bind(this);
//     this.toggleEnableRange = this.toggleEnableRange.bind(this);
//     this.onMinRangeDuration = this.onMinRangeDuration.bind(this);
//     this.onMaxRangeDuration = this.onMaxRangeDuration.bind(this);
//   }

//   onDateChange(date, type) {
//     if (type === "START_DATE") {
//       this.setState({
//         selectedStartDate: date,
//       });
//     }
//     else {
//       this.setState({
//         selectedEndDate: date,
//       });
//     }
//   }

//   clear() {
//     this.setState({
//       selectedStartDate: null,
//       selectedEndDate: null,
//     });
//   }

//   toggleEnableRange(text) {
//     this.setState({
//       enableRangeSelect: !this.state.enableRangeSelect,
//       selectedStartDate: null,
//       selectedEndDate: null,
//     });
//   }

//   onMinRangeDuration(val) {
//     let parsedVal = parseInt(val);
//     this.setState({
//       minRangeDuration: val && !isNaN(parsedVal) ? parsedVal + "" : undefined,
//       selectedStartDate: null,
//       selectedEndDate: null,
//     });
//   }

//   onMaxRangeDuration(val) {
//     let parsedVal = parseInt(val);
//     this.setState({
//       maxRangeDuration: val && !isNaN(parsedVal) ? parsedVal + "" : undefined,
//       selectedStartDate: null,
//       selectedEndDate: null,
//     });
//   }

//   customDayHeaderStylesCallback({dayOfWeek, month, year}) {
//     switch(dayOfWeek) {
//       case 4: // Thursday
//         return {
//           style: {
//             borderRadius: 12,
//             backgroundColor: 'cyan',
//           },
//           textStyle: {
//             color: 'blue',
//             fontWeight: 'bold',
//           }
//         };
//     }
//   }

//   render() {
//     const {
//       customDatesStyles,
//       enableRangeSelect,
//       minDate,
//       maxDate,
//       minRangeDuration,
//       maxRangeDuration,
//       selectedStartDate,
//       selectedEndDate,
//     } = this.state;
//     const formattedStartDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD') : '';
//     const formattedEndDate = selectedEndDate ? selectedEndDate.format('YYYY-MM-DD') : '';

//     return (
//       <View style={styles.container}>
//         <CalendarPicker
//           scrollable
//           selectedStartDate={selectedStartDate}
//           selectedEndDate={selectedEndDate}
//           onDateChange={this.onDateChange}
//           initialDate={minDate}
//           customDatesStyles={customDatesStyles}
//           customDayHeaderStyles={this.customDayHeaderStylesCallback}
//           minDate={minDate}
//           maxDate={maxDate}
//           allowRangeSelection={enableRangeSelect}
//           allowBackwardRangeSelect={enableRangeSelect}
//           minRangeDuration={minRangeDuration && parseInt(minRangeDuration)}
//           maxRangeDuration={maxRangeDuration && parseInt(maxRangeDuration)}
//           headerWrapperStyle={styles.headerWrapperStyle}
//         />

//         <View style={styles.topSpacing}>
//           <Text style={styles.text}>Selected (Start) date:  { formattedStartDate }</Text>
//           { !!formattedEndDate &&
//             <Text style={styles.text}>Selected End date:  { formattedEndDate }</Text>
//           }
//         </View>

//         <View style={styles.topSpacing}>
//           <Button onPress={this.clear} title="Clear Selection"/>
//         </View>

//         <View style={styles.topSpacing}>
//           <Text style={styles.text}>Range select:</Text>
//         </View>
//         <Switch
//           trackColor={{ false: "#767577", true: "#81b0ff" }}
//           thumbColor={enableRangeSelect ? "#f5dd4b" : "#f4f3f4"}
//           ios_backgroundColor="#3e3e3e"
//           onValueChange={this.toggleEnableRange}
//           value={enableRangeSelect}
//         />

//         { enableRangeSelect &&
//           <View>
//             <Text style={styles.text}>minRangeDuration:</Text>
//             <TextInput
//               style={styles.textInput}
//               onChangeText={this.onMinRangeDuration}
//               value={minRangeDuration || ""}
//               keyboardType={"number-pad"}
//             />

//             <Text style={styles.text}>maxRangeDuration:</Text>
//             <TextInput
//               style={styles.textInput}
//               onChangeText={this.onMaxRangeDuration}
//               value={maxRangeDuration || ""}
//               keyboardType={"number-pad"}
//             />
//           </View>
//         }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#FFFFFF',
//     // marginTop: 100,
//     alignItems: 'center',
//     margin: 60,
//   },
//   topSpacing: {
//     marginTop:20
//   },
//   text: {
//     fontSize: 24,
//   },
//   textInput: {
//     height: 40,
//     fontSize: 24,
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   headerWrapperStyle: {
//     backgroundColor: '#ffbdab',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingTop: 20,
//     paddingBottom: 20,
//   }
// });