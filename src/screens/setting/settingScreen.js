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
        <Text style={{ fontSize: 24, color: '#707070' }}>{name === '' ? '尚未登入' : name}</Text>
      </View>
      <Button
        title="登入"
        raised
        containerStyle={{
          marginHorizontal: 120,
          marginVertical: 20,
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
          marginHorizontal: 120,
        }}
        buttonStyle={{
          backgroundColor: '#00bbf0'
        }}
        onPress={() => navigation.push('Signup')}
      />
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
    paddingTop: 30,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItem: {
    height: 72,
    paddingHorizontal: 20,
  }
});
