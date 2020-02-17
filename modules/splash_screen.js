import React, {useEffect} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  
  useEffect(() => {
    async function fetchDetails() {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      const credential = email + password; // Concatenating empty or null values gives you "" or 0
      if (credential === '' || credential === 0) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        authUser(email, password);
      }
    }
    fetchDetails();
  }, []);

  /**
   * This authenticates a user upon subsequent app launch
   * @param {*} email of the user
   * @param {*} password of the user
   */
  const authUser = async (em, pass) => {
    auth()
      .signInWithEmailAndPassword(em, pass)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Tickets'}],
        });
      })
      .catch(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.appName}>REPAYLINE</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#4F4F4F',
    fontFamily: 'Verdana',
    textAlign: 'center',
  },
});
