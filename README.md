# 0-5 지도 검색창 만들기 **

---

## **1. 지도 검색창 만들기**
1. **검색창 만들기**
   - app/components/SearchBar.tsx
     ```tsx
      import React from 'react';
      import { StyleSheet, TextInput, View, Platform } from 'react-native';
      import { SafeAreaView } from 'react-native-safe-area-context';

      type SearchBarProps = {
        search: string;
        setSearch: (text: string) => void;
      };

      export function SearchBar({ search, setSearch }: SearchBarProps) {
        return (
          <SafeAreaView style={styles.safeArea}>
            <TextInput
              style={styles.searchInput}
              placeholder="검색창이요"
              value={search}
              onChangeText={setSearch}
            />
          </SafeAreaView>
        );
      }

      const styles = StyleSheet.create({
        safeArea: {
          position: 'absolute',
          top: 10,
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
        },
      });
     ```
   - SafeAreaView 안에 TextInput
     ```tsx
      <SafeAreaView style={styles.safeArea}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          value={search}
          onChangeText={setSearch}
        />
      </SafeAreaView>
     ```
    - style 적용
     ```tsx
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
     ```

---
1. **지도에 검색창 넣기**
   - app/(tabs)/map.tsx
   - import SearchBar Component
     ```tsx
      import { SearchBar } from '@/components/SearchBar';
     ```
   - View 태그 안에 SearchBar 추가하기
     ```tsx
      <SearchBar search={search} setSearch={setSearch} />
     ```

    - 
     
---

### 결과
위 코드를 사용하면 지도화면 상단에 textInput 검색 창을 만듭니다.🎯
