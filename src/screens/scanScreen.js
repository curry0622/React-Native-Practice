import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as WebBrowser from 'expo-web-browser';

const ScanScreen = () => {const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setUrl(data);
    alert(data);
  };

  const handleOpenBrowser = async () => {
    WebBrowser.dismissBrowser()
    await WebBrowser.openBrowserAsync(url);
    setUrl(null);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      <Button raised title="Tap to Scan Again" disabled={!scanned} onPress={() => setScanned(false)} />
      <Button raised title="Open in browser" disabled={!url} onPress={handleOpenBrowser} />
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
  scanner: {
    width: 300,
    height: 300
  }
});
