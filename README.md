
# 0-3 Map탭에 지도 띄우기

---

## 1. 지도 패키지 설치

### 1.1 패키지 설치
터미널 또는 명령 프롬프트를 열고 아래 명령어를 실행하여 `react-native-maps`를 설치합니다.

```bash
npx expo install react-native-maps
```

---

## 2. 지도 띄우기 코드

### 2.1 전체 영역 Map Style 지정하기
`StyleSheet`에서 `Dimensions`를 사용하여 창 높이와 폭을 지정합니다.

```tsx
map: {
  width: Dimensions.get('window').width,  // 창의 너비
  height: Dimensions.get('window').height, // 창의 높이
},
```

- `Dimensions`를 이용하여 창의 높이와 폭을 측정한 값을 사용하면 전체 화면에 지도가 표시됩니다.

---

### 2.2 `MapView` 태그 사용하기

아래 코드를 참고하여 지도 화면을 구성합니다.

#### 파일 경로: `app/(tabs)/map.tsx`
```tsx
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <MapView 
      style={styles.map}
      initialRegion={{  // Initial location
        latitude: 37.5665,   // 서울시 위도
        longitude: 126.9780, // 서울시 경도
        latitudeDelta: 0.05,  // Zoom level (세로)
        longitudeDelta: 0.02, // Zoom level (가로)
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,  // 창의 너비
    height: Dimensions.get('window').height, // 창의 높이
  },
});
```

- **`initialRegion`**: 초기 지도의 위치와 확대/축소 수준을 설정합니다.
- 위 코드에서는 서울시를 초기 위치로 설정하며, `latitudeDelta`와 `longitudeDelta`는 지도의 확대 수준을 나타냅니다.

---
