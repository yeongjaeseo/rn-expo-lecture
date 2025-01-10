# 0-4 지도 위치를 내 위치로 옮기고 내 위치 표시하기 **

---

## **1. expo-location 설치**
1. **패키지 설치**
   - 터미널 또는 명령 프롬프트를 열고 아래 명령어를 실행하여 설치합니다.
     ```bash
     npx expo install expo-location
     ```
---

## **2. 내 위치표시 및 지도를 내 위치로 옮기기**
1. **내위치 표시 및 이동**
   - app/(tabs)/map.tsx
     ```tsx
      import React, { useEffect, useState } from 'react';
      import { View, StyleSheet, Dimensions } from 'react-native';
      import MapView from 'react-native-maps';
      import * as Location from 'expo-location';

      export default function MapScreen() {
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
     ```
     - region을 사용하고 initialRegion에 사용했던 좌표 값은 삼항연산자 false에 옮긴다 
      1. initialRegion
      •	초기 지도 상태를 설정할 때 사용합니다.
      •	컴포넌트가 처음 렌더링될 때만 적용됩니다.
      •	지도 상태를 동적으로 업데이트하지 않습니다.
      •	한 번 설정하면 그 이후에는 변경되지 않습니다.

        2. region
      •	현재 지도 상태를 제어합니다.
      •	상태 관리와 함께 사용하며, 지도 상태를 동적으로 업데이트할 수 있습니다.
      •	사용자가 지도를 이동하거나 확대/축소할 때, region 값을 업데이트하여 지도를 다시 렌더링할 수 있습니다.
      •	region을 설정하면 지도가 항상 해당 좌표와 줌 레벨을 따라갑니다.
    ---