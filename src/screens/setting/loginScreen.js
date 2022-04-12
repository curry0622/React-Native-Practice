import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import UserContext from '../../contexts/userContext';
import { login } from '../../apis/user';
import { SvgUri } from 'react-native-svg';

const LoginScreen = ({ navigation }) => {
  const { setName } = useContext(UserContext);
  const [psw, setPsw] = useState('');
  const [tmpName, setTmpName] = useState('');
  const [loading, setLoading] = useState(false);

  const onClickLogin = async () => {
    setLoading(true);
    if ((tmpName.length == 0) || (psw.length == 0)) {
      alert('Required field is missing');
    } else if (((/[ ]/).test(psw))) {
      alert('Don\'t include space in password');
    } else {
      const tmp = await login({ name: tmpName, psw });
      if (tmp) {
        if (tmp.Successful) {
          setName(tmpName);
          alert(`Welcome ${tmpName}`);
          navigation.popToTop();
        } else {
          console.log(tmp);
          alert('Login failed');
        }
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.avatarContainer}>
          <SvgUri
            width="100%"
            height="100%"
            uri={`https://avatars.dicebear.com/api/open-peeps/${tmpName}.svg`}
          />
        </View>
        <Input
          label="Name"
          keyboardType="default"
          inputContainerStyle={styles.input}
          onChange={e => setTmpName(e.nativeEvent.text)}
        />
        <Input
          label="Password"
          keyboardType='default'
          secureTextEntry={true}
          inputContainerStyle={styles.input}
          onChange={e => setPsw(e.nativeEvent.text)}
        />
      </View>
      <Button
        title={loading ? '' : 'Login'}
        type="solid"
        raised
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        onPress={() => onClickLogin()}
        icon={loading && <ActivityIndicator color="white" />}
      />
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    margin: 20,
    borderColor: '#ddd',
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
