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
        placeholderTextColor="gray"
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