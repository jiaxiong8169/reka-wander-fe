import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Card from '../../components/card/card';
import Indicator from '../../components/Indicator/Indicator';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';

export default function LoadingScreen({navigation}) {
  // useEffect(() => {
  //   //temporary
  //   setTimeout(() => {
  //     navigation.navigate('Recommended');
  //   }, 2000);
  // });

    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        //temporary
         
        setTimeout(() => {
            navigation.navigate('Recommended');
        }, 2000);
    })

    return (
        <GradientBackground>
            <BlueSubtitle text1="Hi" text2="Melvin," >

            </BlueSubtitle>
            <Text style={styles.subtitle}>
                Create your destiny
            </Text>
            <View style={styles.body}>
                <Card>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.title}>
                            We are preparing your holiday</Text>
                        <Text style={styles.content}>
                            Please wait
                        </Text>
                        <Indicator />
                    </View>



                </Card>
            </View>
        </GradientBackground>

    );


};

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    height: '60%',
    marginTop: '20%',
    alignItems: 'center',
    // marginHorizontal: '8%',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500',
    // marginBottom: 40,
    // padding: 20,
    textAlign: 'center',
  },
  content: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 23,
    // marginBottom: 30,
  },
  subtitle: {
    fontSize: 15,
    color: `#4169E1`,
  },
});
