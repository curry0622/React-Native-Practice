import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="  Login    "
        type="solid"
        raised
        icon={<AntDesign name="login" size={24} color="white" />}
        onPress={() => navigation.push('Login')}
      />
    </SafeAreaView>
  )
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
