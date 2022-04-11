import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../../hooks/useAuth';

export default function PlannerSteps({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Planner_Question');
  };

<<<<<<< HEAD
  useEffect(() => {
    // TODO: incomplete post request
    // post();
  }, []);

=======
>>>>>>> a0cad8d (Refactored auth flow)
  const {authData} = useAuth();

  return (
    <TouchableOpacity onPress={onPressHandler}>
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
                {authData?.name ?? 'Welcome'}
              </Text>
            </Text>
            <Text style={styles.subtitle}>Let's create your destiny</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
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
