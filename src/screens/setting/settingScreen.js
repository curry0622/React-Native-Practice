import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext from '../../contexts/userContext';
import { SvgUri } from 'react-native-svg';

const SettingScreen = ({ navigation }) => {
  const { name } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.listItemsContainer}>
        <View style={styles.avatarContainer}>
          <SvgUri
            width="100%"
            height="100%"
            uri={`https://avatars.dicebear.com/api/open-peeps/${name}.svg`}
          />
        </View>
        <Text style={{ fontSize: 18, color: '#707070' }}>{name === '' ? '訪客' : name}</Text>
        <Button
          title={name === '' ? '登入': '切換帳號'}
          raised
          containerStyle={{
            width: 120,
            margin: 20,
          }}
          buttonStyle={{
            backgroundColor: '#00bbf0'
          }}
          onPress={() => navigation.push('Login')}
        />
        <Button
          title="註冊"
          raised
          containerStyle={{
            width: 120,
          }}
          buttonStyle={{
            backgroundColor: '#00bbf0'
          }}
          onPress={() => navigation.push('Signup')}
        />
      </View>
    </View >
  )
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemsContainer: {
    width: '100%',
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
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
});
