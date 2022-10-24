// import React, {useEffect, useState, useRef, Component} from 'react';
// import Card from '../../components/Card';
// import {View, TouchableOpacity, Text, Alert} from 'react-native';

import React, {useEffect, useState, useRef, Component} from 'react';
import {View, StyleSheet, Button, Alert, Text} from 'react-native';
import TagSelectExtension from './TagSelectExtension';
import {TagSelect} from 'react-native-tag-select';

class TagSelectRoom extends Component {
  render() {
    const data = [
      {id: 1, label: 'Any'},
      {id: 2, label: '1'},
      {id: 3, label: '2'},
      {id: 4, label: '3'},
      {id: 5, label: '4'},
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>Number of Rooms</Text>
        <TagSelectExtension
          data={data}
          ref={tag => {
            this.tag = tag;
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Button
              title="Get selected count"
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  'Selected count',
                  `Total: ${this.tag.totalSelected}`,
                );
              }}
            />
          </View>
          <View>
            <Button
              title="Get selected"
              onPress={() => {
                console.log(this.tag.itemsSelected)
                // Alert.alert(
                //   'Selected items:',
                //   JSON.stringify(this.tag.itemsSelected),
                // );
              }}
            />
          </View>
        </View>
        {/* <Text style={styles.labelText}>With custom style:</Text>
        <TagSelect
          data={data}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333',
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
});

export default TagSelectRoom;

// export const TagSelectRoom = ({roomNum, setRoomNum}) => {
//   const sorting = [
//     {id: 1, label: 'Any'},
//     {id: 2, label: '1'},
//     {id: 3, label: '2'},
//     {id: 4, label: '3'},
//     {id: 5, label: '4'},
//   ];
//   const [selected, setSelected] = useState(false);

//   return (
//     <View>
//       {sorting.map(e => {
//         <View>
//           <TouchableOpacity
//             key={e.id}
//             style={{
//               backgroundColor: selected === true ? 'blue' : 'grey',
//             }}
//             onPress={() => {
//               setSelected(current => !current);
//               setRoomNum(e.id);
//             }}></TouchableOpacity>
//         </View>;
//       })}
//     </View>
//   );
// };
