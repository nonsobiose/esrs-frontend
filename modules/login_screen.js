/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import validator from 'validator';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  /**
   * Validates email pattern
   * @param text containing the email
   */
  const onCheckEmailInput = (text) => {
    setEmail(text);
    if (!validator.isEmail(text)) {
      setIsEmailCorrect(false);
    } else if (validator.isEmail(text)) {
      setIsEmailCorrect(true);
    }
  };

  /**
   * Validates the email and password input for empty entries
   */
  const onLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Sign In', 'Please provide all details');
    } else if (!isEmailCorrect) {
      Alert.alert('Sign In', 'Please provide a valid email');
    } else {
      authUser(email, password);
    }
  };

  /**
   * This authenticates a user upon sign in
   * @param {*} email of the user
   * @param {*} password of the user
   */
  const authUser = async (em, pass) => {
    auth()
      .signInWithEmailAndPassword(em, pass)
      .then(async () => {
        // Persist user's credentials
        await AsyncStorage.setItem('email', em);
        await AsyncStorage.setItem('password', pass);
        navigation.reset({
          index: 0,
          routes: [{name: 'Tickets'}],
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            Alert.alert(
              'Sign In',
              "Sorry, you don't have an account, please sign up for one",
            );
            break;
          case 'auth/invalid-email':
            Alert.alert('Sign In', `Hey, ${em} is invalid`);
            break;
          case 'auth/wrong-password':
            Alert.alert('Sign In', 'Hey, looks like your password is wrong');
            break;
          default:
          // Do nothing
        }
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.appName}>REPAYLINE</Text>
      <View>
        <Text style={styles.welcomeMessageFirstLine}>Hi there</Text>
        <Text style={styles.welcomeMessage}>please login</Text>
        <Text style={styles.welcomeMessage}>to your account.</Text>
      </View>
      <View>
        <View>
          <TextInput
            style={[styles.textInputEmail, {borderColor: isEmailCorrect ? '#CCCCCC' : '#DC7575'}]}
            placeholder="Email"
            defaultValue={email}
            onChangeText={text => onCheckEmailInput(text)}
          />
          <TextInput
            style={styles.textInputPassword}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={onLogin}>
          <Text style={styles.buttonLogIn}>Log me in</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textLoginInfo}>
          Forgot password?{' '}
          <Text
            style={styles.textLoginInfoLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Get it now
          </Text>
        </Text>
        <Text style={styles.textLoginInfo}>
          Don't have an account?{' '}
          <Text
            style={styles.textLoginInfoLink}
            onPress={() => navigation.navigate('Register')}>
            Sign up now
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4F4F4F',
    fontFamily: 'Verdana',
  },
  welcomeMessage: {
    fontSize: 30,
    color: '#CCCCCC',
    fontFamily: 'sans-serif-light',
  },
  welcomeMessageFirstLine: {
    fontFamily: 'sans-serif',
    color: '#CCCCCC',
    fontSize: 30,
  },
  textInputEmail: {
    borderColor: '#CCCCCC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: 60,
    padding: 20,
    fontFamily: 'sans-serif-light',
  },
  textInputPassword: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 60,
    padding: 20,
    fontFamily: 'sans-serif-light',
  },
  buttonLogIn: {
    backgroundColor: '#687DFC',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  textLoginInfo: {
    textAlign: 'center',
    paddingTop: 5,
  },
  textLoginInfoLink: {
    fontWeight: 'bold',
    color: '#687DFC',
  },
});
