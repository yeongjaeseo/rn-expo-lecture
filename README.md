# 0-7 Zustand와 주변 건물 조회 기능 구현하기

---

## **0. 개요**

이 강의에서는 Zustand 상태 관리 라이브러리를 활용하여 주변 건물 조회 기능을 구현하는 방법을 단계별로 다룹니다. 상태 관리를 통해 코드의 재사용성을 높이고, GeoJSON 데이터를 처리하는 로직을 구조화합니다. 다음은 우리가 구현할 주요 목표입니다:

1. **Zustand를 설치하고 소개**
2. **타입 정의**
3. **MapStore 상태 정의**
4. **map.tsx에 상태 반영**
5. **GeoJSON 구조와 처리**

---

## **1. Zustand란?**

Zustand는 React 애플리케이션에서 간단하면서도 강력한 상태 관리 기능을 제공하는 라이브러리입니다. Redux와 비교하여 다음과 같은 장점이 있습니다:

- **경량화**: 최소한의 보일러플레이트 코드로 상태 관리 가능.
- **유연성**: React Context와 독립적으로 동작하며 클래스 컴포넌트에서도 사용 가능.
- **코드 간결성**: 간단한 API로 상태를 정의하고 업데이트할 수 있음.

**설치 방법:**
```bash
npm install zustand
```

---

## **2. 타입 정의**

GeoJSON 데이터를 다루기 위해 타입을 정의합니다. 이를 통해 데이터 구조를 명확히 하고, TypeScript의 타입 안전성을 활용할 수 있습니다.

- `types/building.ts`
```ts
export type Building = {
  bldg_id: number;
  bldg_geom: {
    type: 'MultiPolygon';
    coordinates: [number, number][][][]; // GeoJSON 구조를 반영
  };
};
```

- `types/index.ts`
```ts
export * from './building';
```

---

## **3. MapStore 상태 정의**

Zustand를 사용하여 `MapStore`를 정의합니다. 상태 관리를 통해 지도 중심 좌표와 폴리곤 데이터를 중앙에서 관리합니다.

- **`stores/MapStore.ts`**
```ts
import { create } from 'zustand';
import { Building } from '@/types';

type MapStore = {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null;
  polygons: { id: number; coordinates: { latitude: number; longitude: number }[] }[];
  setRegion: (region: MapStore['region']) => void;
  fetchPolygons: (latitude: number, longitude: number) => Promise<void>;
};

export const useMapStore = create<MapStore>((set) => ({
  region: null,
  polygons: [],
  setRegion: (region) => set({ region }),
  fetchPolygons: async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nest-lecture-88013499747.asia-northeast2.run.app/bldg/nearby?x=${longitude}&y=${latitude}&radius=200`
      );
      const data: Building[] = await response.json();

      // 폴리곤 데이터 변환 및 null 제거
      const polygons = data
        .map((building) => {
          const coordinatesArray = building.bldg_geom.coordinates?.[0]?.[0];
          if (!coordinatesArray || !Array.isArray(coordinatesArray)) return null;

          const coordinates = coordinatesArray
            .filter((coord): coord is [number, number] => Array.isArray(coord) && coord.length === 2)
            .map((coord) => ({
              latitude: coord[1],
              longitude: coord[0],
            }));

          return { id: building.bldg_id, coordinates };
        })
        .filter(
          (polygon): polygon is { id: number; coordinates: { latitude: number; longitude: number }[] } =>
            polygon !== null
        );

      set({ polygons });
    } catch (error) {
      console.error('Error fetching polygons:', error);
    }
  },
}));
```

---

## **4. map.tsx에 Zustand 상태 반영**

지도 화면에 Zustand 상태를 반영하여 폴리곤 데이터를 표시하고, 버튼 클릭 시 상태를 업데이트합니다.

- **`app/(tabs)/map.tsx`**
```tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from '@/components/SearchBar';
import LoadingButton from '@/components/LoadingButton';
import { useMapStore } from '@/stores/MapStore';

export default function MapScreen() {
  const { region, polygons, setRegion, fetchPolygons } = useMapStore(); // zustand 상태와 함수 가져오기
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 초기 위치 가져오기
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02,
      });
    }
    getCurrentLocation();
  }, []);

  // 버튼 클릭 핸들러
  const handleButtonPress = async () => {
    if (!region) return;

    setIsLoading(true);
    await fetchPolygons(region.latitude, region.longitude); // zustand에서 fetchPolygons 호출
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        region={region || undefined}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // 지도 이동 시 중심 좌표 업데이트
      >
        {polygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            strokeColor="#FF0000" // 폴리곤 테두리 색상
            fillColor="rgba(255,0,0,0.3)" // 폴리곤 내부 색상 (반투명)
            strokeWidth={2}
          />
        ))}
      </MapView>
      <SearchBar search={search} setSearch={setSearch} />
      <LoadingButton title="주변 건물 조회" isLoading={isLoading} onPress={handleButtonPress} />
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

---

## **5. GeoJSON 구조와 데이터 처리**

GeoJSON 데이터를 기반으로 폴리곤을 지도에 렌더링합니다. `coordinates` 속성을 처리할 때 `number[][][][]`의 구조를 이해하고, 외곽선과 구멍 데이터를 구분하여 렌더링합니다.

### 코드 리뷰
- **다각형 데이터 변환**:
  - 외곽선(Outer Ring): `polygon[0]`.
  - 구멍(Inner Rings): `polygon[1:]` (옵션).
- **좌표 변환**:
  - `[x, y]` 좌표를 `{ latitude: y, longitude: x }`로 변환.
- **상태 업데이트**:
  - Zustand를 통해 중앙 상태에서 데이터 관리.

---

## **결과**
- Zustand 상태 관리와 GeoJSON 데이터 처리로 주변 건물 폴리곤을 지도에 표시.
- 상태와 API 로직 분리로 코드 재사용성과 유지보수성 향상.
- 사용자가 지도 중심을 이동하면 새로운 데이터를 조회하여 지도에 반영.

---

## **다음 단계**
1. 다중 데이터를 처리할 때 성능 최적화.
2. 사용자의 입력에 따라 반응형으로 지도 데이터를 업데이트.
3. 추가적인 상태 관리 개선 및 애니메이션 효과 적용.
4. 데이터 캐싱을 추가하여 동일한 API 호출을 반복하지 않도록 최적화.

---