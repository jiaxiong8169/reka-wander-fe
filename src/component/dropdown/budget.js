import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SelectBudget = () => {

    const [Budget, SetBudget] = useState('100');

    return (
        <View>
            <Picker
                selectedValue={Budget}
                onValueChange={(value, index) => SetBudget(value)}
                mode="dropdown" // Android only
                style={styles.picker}
            >
                <Picker.Item label="100" value="100" />
                <Picker.Item label="200" value="200" />
                <Picker.Item label="300" value="300" />
                <Picker.Item label="400" value="400" />
                <Picker.Item label="500" value="500" />
                <Picker.Item label="600" value="600" />
                <Picker.Item label="700" value="700" />

            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
    },
    picker: {
        alignContent: 'center',
        marginLeft: 60,
        width: 110,
        height: 50,
        borderWidth: 0.1,
        // borderColor: "#666",
        borderColor: "#000",
    },
});

export default SelectBudget;