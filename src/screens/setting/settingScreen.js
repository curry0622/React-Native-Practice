import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import UserContext from '../../contexts/userContext';

const SettingScreen = ({ navigation }) => {
  const { name, setName } = useContext(UserContext);

  return (
    <ScrollView style={styles.container} >
      <View style={styles.listItemsContainer}>
        <Ionicons name="person-circle-sharp" size={72} color={`${name === '' ? '#707070' : '#00bbf0'}`} />
        <Text style={{ fontSize: 18, color: '#707070' }}>{name === '' ? '尚未登入' : name}</Text>
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
    </ScrollView >
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
  }
});
