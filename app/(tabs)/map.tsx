import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TextInput, Platform } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null); // Location object
  
  useEffect(() => {
    async function getCurrentLocation() { // Get the user's current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    }
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        showsUserLocation={true} // Show the user's location
        region={location ? { // initial region에 설정했던 값은 false에 이동
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        } : {
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        }}
      />
      <SafeAreaView style={styles.safeArea}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          value={search}
          onChangeText={setSearch}
        />
      </SafeAreaView>
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
  safeArea: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 25 : 0, // Adjust for Android
    width: '100%',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'android' ? 10 : 0, // Adjust for Android
  },
  map: {
    width: Dimensions.get('window').width, // Full width
    height: Dimensions.get('window').height, // Full height
  },
});