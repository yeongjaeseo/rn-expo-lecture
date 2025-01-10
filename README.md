# 0-3 Map탭에 지도 띄우기 **

---

## **1. 지도 패키지 설치**
1. **지도 패키지 설치**
   - 터미널 또는 명령 프롬프트를 열고 아래 명령어를 실행하여 설치합니다.
     ```bash
     npx expo install react-native-maps
     ```
---

## **2. 지도 띄우기 코드**
1. **전체 영역 Map Style 지정하기**
   ```tsx
   map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
   ```
   - Dimension을 이용하여 창 높이와 폭을 측정한 값을 사용하면 전체화면 영역이 된다.
2. **MapView 태그 사용하기**
   - app/(tabs)/map.tsx
     ```tsx
      <MapView 
        style={styles.map}
        initialRegion={{  // Initial location
          latitude: 37.5665,
          longitude: 126.9780,
          latitudeDelta: 0.05,  // Zoom level
          longitudeDelta: 0.02, //  Zoom level
        }}
      />
     ```
   - 서울시를 이니셜 포지션으로 지정하고 Delta값은 지도의 확대 수준

---