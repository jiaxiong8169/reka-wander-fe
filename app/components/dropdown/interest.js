// import React, { useState } from 'react';
// // import React, { Component } from 'react';
// // import Select from 'react-select';
// import { View } from "react-native";
// import Multiselect from 'multiselect-react-dropdown';

// // const option = [
// //     { name: 'Entertainment', id: 'Entertainment' },
// //     { name: 'Leisure', id: 'Leisure' },
// //     { name: 'Nature', id: 'Nature' },
// //     { name: 'koenigsegg', id: 'Koenigsegg' },
// //     { name: 'bmw', id: 'BMW' },
// //     { name: 'cadillac', id: 'Cadillac' },
// // ];


// const SelectInterest = () => {

//     const [selectedOption, setselectedOption] = useState({ value: '', label: 'Select anything' });
//     return (
//         // <View>


//             <Multiselect

//                 options={[
//                     { name: 'Entertainment', id: 'Entertainment' },
//                     { name: 'Leisure', id: 'Leisure' },
//                     { name: 'Nature', id: 'Nature' },
//                     { name: 'koenigsegg', id: 'Koenigsegg' },
//                     { name: 'bmw', id: 'BMW' },
//                     { name: 'cadillac', id: 'Cadillac' },
//                 ]}
//                 selectedValues={(value, index) => setselectedOption(value)}
//                 placeholder='Interests'
//             >

//             </Multiselect>
//         // </View>
//     );
// }



// export default SelectInterest;



// import component
// import React from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import MultiSelect from 'react-native-multiple-select';

// const items = [{
//   id: '92iijs7yta',
//   name: 'Ondo'
// }, {
//   id: 'a0s0a8ssbsd',
//   name: 'Ogun'
// }, {
//   id: '16hbajsabsd',
//   name: 'Calabar'
// }, {
//   id: 'nahs75a5sg',
//   name: 'Lagos'
// }, {
//   id: '667atsas',
//   name: 'Maiduguri'
// }, {
//   id: 'hsyasajs',
//   name: 'Anambra'
// }, {
//   id: 'djsjudksjd',
//   name: 'Benue'
// }, {
//   id: 'sdhyaysdj',
//   name: 'Kaduna'
// }, {
//   id: 'suudydjsjd',
//   name: 'Abuja'
// }
// ];

// const onSelectedItemsChange = (selectedItems) => {
//   // do something with selectedItems
//   console.log('Selected Items: ', selectedItems);
// };

// const MultiSelectExample = () => {




//   return (
//     <View style={{ flex: 1 }}>
//       <MultiSelect
//         hideTags
//         items={items}
//         uniqueKey="id"
//         ref={(component) => { this.multiSelect = component }}
//         onSelectedItemsChange={onSelectedItemsChange}
//         selectedItems={[]}
//         selectText="Pick Items"
//         searchInputPlaceholderText="Search Items..."
//         onChangeInput={(text) => console.log(text)}
//         altFontFamily="ProximaNova-Light"
//         tagRemoveIconColor="#CCC"
//         tagBorderColor="#CCC"
//         tagTextColor="#CCC"
//         selectedItemTextColor="#CCC"
//         selectedItemIconColor="#CCC"
//         itemTextColor="#000"
//         displayKey="name"
//         searchInputStyle={{ color: '#CCC' }}
//         submitButtonColor="#CCC"
//         submitButtonText="Submit"
//       />
//       <View>
//         {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
//       </View>
//     </View>
//   );
// };

// export default MultiSelectExample;











// import component
// import React, { Component } from 'react';
// import { SafeAreaView, View } from 'react-native';
// import MultiSelect from 'react-native-multiple-select';

// const items = [{
//   id: 'Entertaiment',
//   name: 'Entertaiment'
// },
// {
//   id: 'Leisure',
//   name: 'Leisure'
// },
// {
//   id: 'Adventure',
//   name: 'Adventure'
// },
// {
//   id: 'Culture',
//   name: 'Culture'
// },
// {
//   id: 'Honeymoons',
//   name: 'Honeymoons'
// },
// {
//   id: 'Nature',
//   name: 'Nature'
// },
// {
//   id: 'djsjudksjd',
//   name: 'Benue'
// },
// {
//   id: 'sdhyaysdj',
//   name: 'Kaduna'
// },
// {
//   id: 'suudydjsjd',
//   name: 'Abu'
// }
// ];

// class MultiSelectExample extends Component {

//   state = {
//     selectedItems: [],
//   };


//   onSelectedItemsChange = selectedItems => {
//     this.setState({ selectedItems });
//   };

//   render() {
//     const { selectedItems } = this.state;

//     return (
//       // <SafeAreaView>
//       <View>
//         <MultiSelect
//           hideTags={true}
//           flatListProps={{ nestedScrollEnabled: true }}
//           items={items}
//           uniqueKey="id"
//           ref={(component) => { this.multiSelect = component }}
//           onSelectedItemsChange={this.onSelectedItemsChange}
//           selectedItems={selectedItems}
//           selectText="Select your travel interest"
//           searchInputPlaceholderText="Search interest..."
//           // onChangeInput={(text) => console.log(text)}
//           altFontFamily="ProximaNova-Light"
//           tagRemoveIconColor="#6fbae8"
//           tagBorderColor="#6fbae8"
//           tagTextColor="#483D8B"

//           selectedItemTextColor="#CCC"
//           selectedItemIconColor="#191970"
//           // styleTextDropdownSelected={{ color: "#AFEEEE" }}
//           // styleTextDropdown={{color: "#AFEEEE"}}
//           itemTextColor="#483D8B"
//           submitButtonColor="#6fbae8"
//           displayKey="name"
//           searchInputStyle={{
//             color: "#CCC"
//           }}
//           // submitButtonColor="#CCC"
//           submitButtonText="Submit"
//           // noItemsText='Please select at least one'
//           styleMainWrapper={{
//             marginHorizontal: 10,
//             // width: '66%',
//           }}
//           styleItemsContainer={{
//             // margin: 10,
//           }}
//           styleListContainer={{
//             // maxHeight: 150
//           }}
//           tagContainerStyle={
//             {
//               justifyContent: 'flex-start',
//               height: 33,
//               width: '40%',
//               paddingLeft: 10,
//               paddingRight: 10,
//             }
//           }
//           styleTextTag={
//             {
//               fontSize: 10,
//             }
//           }
//           styleDropdownMenuSubsection={{
//             paddingVertical: 0,
//           }}
//           // fixedHeight={true}
//         // textColor="#AFEEEE"


//         />
//         <View>
//           {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
//           {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
//         </View>
//       </View>
//       // </SafeAreaView>
//     );
//   }
// }

// export default MultiSelectExample;




import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [{
  name: 'Travel Interest',
  id: 0,
  children: [
    {
      id: 'Entertaiment',
      name: 'Entertaiment'
    },
    {
      id: 'Leisure',
      name: 'Leisure'
    },
    {
      id: 'Adventure',
      name: 'Adventure'
    },
    {
      id: 'Culture',
      name: 'Culture'
    },
    {
      id: 'Honeymoons',
      name: 'Honeymoons'
    },
    {
      id: 'Nature',
      name: 'Nature'
    },
    {
      id: 'djsjudksjd',
      name: 'Benue'
    },
    {
      id: 'sdhyaysdj',
      name: 'Kaduna'
    },
    {
      id: 'suudydjsjd',
      name: 'Abu'
    },
    {
      id: 'suhaydjsjd',
      name: 'Abubu'
    },
    {
      id: 'aaaaa',
      name: 'Abuyo'
    },
    {
      id: 'sutttt',
      name: 'Adu'
    }
  ]
}
];

export default class MultiSelectExample extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
    };
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="id"

          subKey="children"
          selectText="Choose your interest"
          searchPlaceholderText="Search your interest"
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          styles={{
            button: { backgroundColor: "#4169E1" },
            chipText: { color: "red" },
            chipsWrapper: { color: "red" },
            chipContainer: { borderColor: "#6fbae8" },
            parentChipContainer: { color: "red" },
            chipText: { color: "#483D8B" },
            chipIcon: { color: "#6fbae8" }

          }}
          // function component
          onPress={() => ref && ref.current && ref.current._toggleSelector()}
          modalWithTouchable={true}
          // class component
          // onPress={() => this.SectionedMultiSelect._toggleSelector()}

        />
      </View>
    );
  }
}