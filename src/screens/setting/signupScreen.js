import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';

const SignupScreen = ({ navigation }) => {
  const [showPsw, setShowPsw] = useState(false);
  const [email, setEmail] = useState('');
  const [psw, setPsw] = useState('');
  const [confirmPsw, setConfirmPsw] = useState('');

  const checkValid = () => {
    const checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

    if ((email.length == 0) || (psw.length == 0) || (confirmPsw.length == 0)) {
      alert('Required field is missing');
    } else if (!(checkEmail).test(email)) {
      alert('Invalid email');
    } else if (psw.length < 8) {
      alert('Password must be at least 8 characters long');
    } else if (((/[ ]/).test(psw))) {
      alert('Don\'t include space in password');
    } else if (psw !== confirmPsw) {
      alert('Password doesn\'t match');
    } else {
      navigation.popToTop();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          keyboardType='email-address'
          inputContainerStyle={styles.input}
          onChange={e => setEmail(e.nativeEvent.text)}
        />
        <Input
          label="Password"
          keyboardType='default'
          secureTextEntry={!showPsw}
          inputContainerStyle={styles.input}
          onChange={e => setPsw(e.nativeEvent.text)}
        />
        <Input
          label="Confirm Password"
          keyboardType='default'
          secureTextEntry={!showPsw}
          inputContainerStyle={styles.input}
          onChange={e => setConfirmPsw(e.nativeEvent.text)}
        />
      </View>
      <Button
        title="Register"
        type="solid"
        raised
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => checkValid()}
      />
    </SafeAreaView>
  )
};

export default SignupScreen;

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