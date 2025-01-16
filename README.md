# 0-5 지도 검색창 만들기 **

---

## **1. 지도 검색창 만들기**
1. **검색창 만들기**
   - app/(tabs)/map.tsx
   - useState 추가
     ```tsx
      const [search, setSearch] = useState('');
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

    - 
     
---

### 결과
위 코드를 사용하면 지도화면 상단에 textInput 검색 창을 만듭니다.🎯
