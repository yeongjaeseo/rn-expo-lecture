# 0-2 Map 탭 추가하기 **

---


## **1. 잘 부탁드립니다! **
1. **index. tsx에서 text 수정**
   - <ThemedText type="title">잘 부탁드립니다!</ThemedText> 

---

## **2. 새로운 탭 추가하기**
1. **새로운 탭 파일 생성**
   - (tabs) 디렉토리에 map.tsx 파일을 생성합니다.
   - map.tsx안에 아래 코드를 작성합니다.
     ```tsx
      import React from 'react';
      import { View, Text, StyleSheet } from 'react-native';

      export default function MapScreen() {
      return (
         <View style={styles.container}>
            <Text style={styles.title}>지도가 들어갈 페이지에요!</Text>
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
      title: {
         fontSize: 20,
         color: 'black',
      },
      });
     ```

2. **탭 아이콘 심볼 추가**
   -  components/ui/IconSymbol.tsx에 MAPPING에 아래 코드 추가
      ```tsx
      'map.fill': 'map',
      ```
3. **탭 네비게이터에 새로운 탭 추가**
   -  Tabs 태그 안에 아래 코드를 추가합니다.
      ```tsx
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map" color={color} />,
        }}
      />
      ```
---