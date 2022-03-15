import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [showPsw, setShowPsw] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          inputContainerStyle={styles.input}
        />
        <Input
          label="Password"
          secureTextEntry={!showPsw}
          inputContainerStyle={styles.input}
          rightIcon={
            !showPsw
            ? <Ionicons name="ios-eye" size={24} color="#969696" onPress={() => setShowPsw(!showPsw)} />
            : <Ionicons name="ios-eye-off" size={24} color="#969696" onPress={() => setShowPsw(!showPsw)} />}
        />
      </View>
      <Button
        title="  Login    "
        type="solid"
        raised
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        icon={<AntDesign name="login" size={24} color="white" />}
        onPress={() => navigation.popToTop()}
      />
    </SafeAreaView>
  )
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    marginTop: 40
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10
  },
  buttonContainer: {
    width: '85%',
    // height: 50,
    // margin: 20,
    // padding: 20,
  },
  button: {
    // width: '100%',
    padding: 12,
    backgroundColor: '#0085ff',
    borderRadius: 5,
  }
});
