import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { API } from '../android/API/BaseApi';
import { loginSuccess } from '../Redux/AuthSlice/AuthSlice';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginHandle = async () => {
    if (!userName) {
      setUserNameError(true);
      return;
    } else {
      setUserNameError(false);
    }
    if (!password) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

  
      const response = await API.post(
        'api/login',
        { userName, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        dispatch(loginSuccess({
          user: response.data.user,
          token: response.data.token
        }));
      } else {
        Alert.alert('Error', response.data.message);
      }
  
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200).duration(1000)}>
        <Text style={styles.heading}>Login</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).duration(1000)}
        style={[styles.inputContainer, userNameError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor='gray'
          value={userName}
          onChangeText={setUserName}
        />
      </Animated.View>
      {userNameError && <Text style={styles.errorText}>Username is required</Text>}

      <Animated.View entering={FadeInUp.delay(600).duration(1000)}
        style={[styles.inputContainer, passwordError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor='gray'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Animated.View>
      {passwordError && <Text style={styles.errorText}>Password is required</Text>}

      <Animated.View entering={FadeInDown.delay(400).duration(1000)}>
        <TouchableOpacity onPress={loginHandle} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(1000)} style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(8),
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: hp(4),
    color: '#dc3545',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: hp(3),
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: hp(1),
    width: wp(80),
    borderRadius: wp(2),
    borderWidth: wp(0.5),
    borderColor: '#ced4da',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    padding: wp(3),
    fontSize: hp(2),
    color: '#495057',
  },
  errorBorder: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    marginLeft: wp(2),
    fontSize: hp(1.7),
    marginBottom: hp(1),
  },
  loginButton: {
    backgroundColor: '#dc3545',
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    marginTop: hp(2),
    width: wp(80),
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  signupText: {
    color: '#495057',
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Login;
