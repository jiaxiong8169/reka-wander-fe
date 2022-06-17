import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function HomePage({navigation}) {
  // redirect to the planner page after 2 seconds
  useEffect(() => {
    let timer1 = setTimeout(() => {
      EncryptedStorage.getItem('auth_data').then(d => {
        if (!!d) navigation.replace('MainScreen');
        else navigation.replace('SignInScreen');
      });
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <View>
      <LinearGradient
        colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hi{' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'sans-serif-light',
              }}>
              Welcome,
            </Text>
          </Text>
          <Text style={styles.subtitle}>Let's create your destiny</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '300',
    fontSize: 60,
    color: `#4169E1`,
  },
  subtitle: {
    fontSize: 20,
    color: `#4169E1`,
  },
});
