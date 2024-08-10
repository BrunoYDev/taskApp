import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firebase from '../../services/firebaseConnection';

const Login = ({changeUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    if (!isRegister) {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          changeUser(user.user.uid);
        })
        .catch(error => {
          console.log(error);
          alert('Something went wrong');
          return;
        });
    } else {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          changeUser(user.user.uid)
        })
        .catch(error => {
          console.log(error);
          alert('Something went wrong');
          return;
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Your Email: "
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Your Password: "
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginBtnArea} onPress={handleLogin}>
        <Text style={styles.loginBtnText}>
          {isRegister ? 'Register' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerBtnArea}
        onPress={() => setIsRegister(isRegister ? false : true)}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {isRegister ? 'Login' : 'Create an Account'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
  },
  loginBtnArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    marginBottom: 10,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;
