import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { API } from '../android/API/BaseApi';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const registerHandle = async () => {
    if (!name) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    if (!userName) {
      setUserNameError(true);
      return;
    } else {
      setUserNameError(false);
    }
    if (!country) {
      setCountryError(true);
      return;
    } else {
      setCountryError(false);
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    try {
      const result = await API.post('api/register', { name, userName, country, password });
      if (result.data.success) {
        navigation.navigate('login');
      } else {
        alert(result.data.message); // Handle error if the API response indicates failure
      }
    } catch (error) {
      alert('An error occurred. Please try again later.'); // Handle network or other errors
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200).duration(1000)}>
        <Text style={styles.heading}>Sign Up</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).duration(1000)} style={[styles.inputContainer, nameError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
      </Animated.View>
      {nameError && <Text style={styles.errorText}>Name is required</Text>}

      <Animated.View entering={FadeInUp.delay(600).duration(1000)} style={[styles.inputContainer, userNameError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          value={userName}
          onChangeText={setUserName}
        />
      </Animated.View>
      {userNameError && <Text style={styles.errorText}>Username is required</Text>}

      <Animated.View entering={FadeInUp.delay(800).duration(1000)} style={[styles.inputContainer, countryError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="gray"
          value={country}
          onChangeText={setCountry}
        />
      </Animated.View>
      {countryError && <Text style={styles.errorText}>Country is required</Text>}

      <Animated.View entering={FadeInUp.delay(1000).duration(1000)} style={[styles.inputContainer, passwordError ? styles.errorBorder : null]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Animated.View>
      {passwordError && <Text style={styles.errorText}>Password is required and must be at least 6 characters</Text>}

      <Animated.View entering={FadeInDown.delay(400).duration(1000)}>
        <TouchableOpacity onPress={registerHandle} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(1000)} style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.loginLink}>Sign In</Text>
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
  registerButton: {
    backgroundColor: '#dc3545',
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
    marginTop: hp(2),
    width: wp(80),
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  loginText: {
    color: '#495057',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Signup;
