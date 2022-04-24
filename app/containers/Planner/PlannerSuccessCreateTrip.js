import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';

export default function SuccessConfirmScreen({navigation}) {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      console.log(e);
      if (e?.data?.action?.type === 'GO_BACK' && e.target.includes('Success'))
        e.preventDefault();
    });
  }, [navigation]);

  const onPressHandler = () => {
    navigation.navigate('Planner_Question');
  };
  return (
    <ScrollView>
      <GradientBackground>
        <BlueSubtitle text1="Hi" text2="Welcome,"></BlueSubtitle>
        <Text style={styles.subtitle}>Create your destiny</Text>
        <View style={styles.body}>
          <Card
            style={{
              width: '100%',
            }}>
            <View>
              <Text style={styles.title}>
                Congrats! Your trip is succesfully planned!
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 250,
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={require('../../assets/Travel_interest.png')}
                style={{
                  aspectRatio: 1,
                  width: undefined,
                  resizeMode: 'contain',
                  height: '100%',
                }}
              />
            </View>
          </Card>
          <View style={{marginTop: 20}}>
            <TouchableOpacity onPress={onPressHandler}>
              <Text
                style={{
                  color: 'white',
                  padding: 12,
                  backgroundColor: '#4169E1',
                  borderRadius: 50,
                  textAlign: 'center',
                  marginHorizontal: 80,
                }}>
                Back to Home Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    // height: '60%',
    // marginBottom: 20,
    marginTop: 30,
    // marginHorizontal: '1%',
    width: '100%',
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
