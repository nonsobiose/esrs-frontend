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

const RegisterScreen = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const onCheckEmailInput = (text) => {
    setEmail(text);
    if (!validator.isEmail(text)) {
      setIsEmailCorrect(false);
    } else if (validator.isEmail(text)) {
      setIsEmailCorrect(true);
    }
  };

  /**
   * This creates a new user credential
   * @param {*} email of the user
   * @param {*} password of the user
   */
  const signUp = async (em, pass) => {
    auth()
      .createUserWithEmailAndPassword(em, pass)
      .then(async () => {
        // Persist user's credentials
        await AsyncStorage.setItem('email', em);
        await AsyncStorage.setItem('password', pass);
        // Make POST request to backend
        navigation.reset({
          index: 0,
          routes: [{name: 'Tickets'}],
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Sign Up', `Hey, ${em} is already in use`);
            break;
          case 'auth/invalid-email':
            Alert.alert('Sign Up', `Hey, ${em} is invalid`);
            break;
          default:
          // Do nothing for now
        }
      });
  };

  /**
   * Validates the fullname, email and password input for empty entries
   */
  const onSignUp = () => {
    if (fullname === '' || email === '' || password === '') {
      Alert.alert('Sing Up', 'Please provide all details');
    } else if (!isEmailCorrect) {
      Alert.alert('Sing Up', 'Please provide a valid email');
    } else if (password.length < 6) {
      Alert.alert('Sing Up', 'Password must be at least 6 characters long');
    } else {
      signUp(email, password);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.appName}>REPAYLINE</Text>
      <View>
        <Text style={styles.welcomeMessageFirstLine}>Welcome</Text>
        <Text style={styles.welcomeMessage}>sign up and reclaim</Text>
        <Text style={styles.welcomeMessage}>your money.</Text>
      </View>
      <View>
        <View>
          <TextInput
            style={styles.textInputFullname}
            placeholder="Fullname"
            onChangeText={text => setFullname(text)}
            defaultValue={fullname}
          />
          <TextInput
            style={[
              styles.textInputEmail,
              {borderColor: isEmailCorrect ? '#CCCCCC' : '#DC7575'},
            ]}
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
        <TouchableOpacity onPress={onSignUp}>
          <Text style={styles.buttonSignUp}>Sign me up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.textRegisterInfo}>
          By creating an account you agree to our
        </Text>
        <Text style={styles.textRegisterInfo}>
          <Text style={styles.textRegisterInfoLink}>
            Terms &amp; Conditions
          </Text>{' '}
          and <Text style={styles.textRegisterInfoLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
  textInputFullname: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    fontFamily: 'sans-serif-light',
  },
  textInputEmail: {
    borderColor: '#CCCCCC',
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
  buttonSignUp: {
    backgroundColor: '#687DFC',
    borderRadius: 8,
    color: '#FFFFFF',
    padding: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  textRegisterInfo: {
    textAlign: 'center',
  },
  textRegisterInfoLink: {
    fontWeight: 'bold',
    color: '#687DFC',
  },
});
