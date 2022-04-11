import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../../contexts/userContext';
import login from '../../apis/login';

const LoginScreen = ({ navigation }) => {
  const { name, setName } = useContext(UserContext);
  const [showPsw, setShowPsw] = useState(false);
  const [psw, setPsw] = useState('');

  const onClickLogin = async () => {
    if ((name.length == 0) || (psw.length == 0)) {
      alert('Required field is missing');
    } else if (((/[ ]/).test(psw))) {
      alert('Don\'t include space in password');
    } else {
      const tmp = await login({ name, psw });
      if (tmp) {
        if (tmp.Successful) {
          alert(`Welcome ${name}`);
          navigation.popToTop();
        } else {
          alert('Login failed');
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label="Name"
          keyboardType="default"
          inputContainerStyle={styles.input}
          onChange={e => setName(e.nativeEvent.text)}
        />
        <Input
          label="Password"
          keyboardType='default'
          secureTextEntry={!showPsw}
          inputContainerStyle={styles.input}
          onChange={e => setPsw(e.nativeEvent.text)}
          // rightIcon={
          //   !showPsw
          //   ? <Ionicons name="ios-eye" size={24} color="#969696" onPress={() => setShowPsw(!showPsw)} />
          //   : <Ionicons name="ios-eye-off" size={24} color="#969696" onPress={() => setShowPsw(!showPsw)} />}
        />
      </View>
      <Button
        title="Log in"
        type="solid"
        raised
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => onClickLogin()}
      />
      {/* <Button
        title="Forgot Password ?"
        type="solid"
        titleStyle={{ color: '#00bbf0' }}
        buttonStyle={{ ...styles.btn, ...styles.whiteBtn }}
        containerStyle={styles.btnContainer}
        onPress={() => navigation.popToTop()}
      /> */}
      <View style={styles.divider} />
      <Text style={styles.hintTxt}>Don't have an account ?</Text>
      <Button
        title="Sign up"
        type="solid"
        titleStyle={{ color: '#00bbf0' }}
        buttonStyle={{ ...styles.btn, ...styles.whiteBtn }}
        containerStyle={styles.btnContainer}
        onPress={() => navigation.push('Signup')}
      />
    </SafeAreaView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    marginTop: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  btnContainer: {
    width: '85%',
    marginBottom: 20,
  },
  btn: {
    padding: 12,
    backgroundColor: '#00bbf0',
    borderRadius: 5,
  },
  whiteBtn: {
    backgroundColor: 'transparent',
    color: '#00bbf0',
  },
  hintTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#969696',
    marginBottom: 10,
  },
  divider: {
    width: '85%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 30,
  }
});
