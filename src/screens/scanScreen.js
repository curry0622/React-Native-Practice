import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {openCamera ? (
          <Camera style={styles.camera} type={type}>
            {/* <Ionicons name="scan-outline" size={200} color="#fff" /> */}
          </Camera>
        ) : (
          <Text>Open Camera</Text>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="  Open  " type="solid" raised disabled={openCamera} onPress={() => setOpenCamera(true)} icon={<Ionicons name="camera" size={24} color="#fff" />} />
        <Button title="  Close  " type="solid" raised disabled={!openCamera} onPress={() => setOpenCamera(false)} icon={<Ionicons name="close-circle" size={24} color="#fff" />} />
      </View>
    </SafeAreaView>
  )
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cameraContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});
