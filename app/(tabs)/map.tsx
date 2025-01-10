import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={{  // Initial location
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.05,  // Zoom level
          longitudeDelta: 0.02, //  Zoom level
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get('window').width, // Full width
    height: Dimensions.get('window').height, // Full height
  },
});