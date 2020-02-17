/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import validator from 'validator';
import auth from '@react-native-firebase/auth';

const ForgotPassword = () => {
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
      /*this.textInputEmail.setNativeProps({
        borderColor: '#DC7575',
      });*/
    } else if (validator.isEmail(text)) {
      setIsEmailCorrect(true);
      /*this.textInputEmail.setNativeProps({
        borderColor: '#CCCCCC',
      });*/
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.appName}>REPAY LINE</Text>
      <View>
        <Text style={styles.forgotPasswordMessageFirstLine}>
          Forgot Password?
        </Text>
        <Text style={styles.forgotPasswordMessage}>Enter your email</Text>
        <Text style={styles.forgotPasswordMessage}>to get it.</Text>
      </View>
      <View>
        <View>
          <TextInput
            style={[
              styles.textInputEmail,
              {borderColor: isEmailCorrect ? '#CCCCCC' : '#DC7575'},
            ]}
            placeholder="Your email"
            defaultValue={email}
            onChangeText={text => onCheckEmailInput(text)}
          />
        </View>
        <TouchableOpacity onPress={console.log('Hello')}>
          <Text style={styles.buttonLogIn}>Send it to me</Text>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
};

export default ForgotPassword;

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
  forgotPasswordMessage: {
    fontSize: 30,
    color: '#CCCCCC',
    fontFamily: 'sans-serif-light',
  },
  forgotPasswordMessageFirstLine: {
    fontFamily: 'sans-serif',
    color: '#CCCCCC',
    fontSize: 30,
  },
  textInputEmail: {
    borderRadius: 8,
    borderWidth: 1,
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
