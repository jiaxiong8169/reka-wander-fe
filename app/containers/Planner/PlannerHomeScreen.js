import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const HomePage = () => {
    return (
        <View>
            <LinearGradient
                colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
                style={{ height: '100%', width: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Hi <Text style={{
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif-light',
                        }}>Melvin,</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Let's create your destiny
                    </Text>
                </View>
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        // alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '300',
        fontSize: 60,
        // marginHorizontal: 10,
        // marginTop: 10,
        color: `#4169E1`,
    },
    subtitle: {
        fontSize: 20,
        // marginLeft: 10,
        color: `#4169E1`,
    },
});

export default HomePage;