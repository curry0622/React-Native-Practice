import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [showPsw, setShowPsw] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          keyboardType='email-address'
          inputContainerStyle={styles.input}
        />
        <Input
          label="Password"
          keyboardType='default'
          secureTextEntry={!showPsw}
          inputContainerStyle={styles.input}
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
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Forgot Password ?"
        type="solid"
        titleStyle={{ color: '#00bbf0' }}
        buttonStyle={{ ...styles.btn, ...styles.whiteBtn }}
        containerStyle={styles.btnContainer}
        onPress={() => navigation.popToTop()}
      />
      <View style={styles.divider} />
      <Text style={styles.hintTxt}>Don't have an account ?</Text>
      <Button
        title="Sign up"
        type="solid"
        raised
        buttonStyle={styles.btn}
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
