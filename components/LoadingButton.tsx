import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingButtonProps {
  title: string;
  isLoading: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  [key: string]: any;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  title,
  isLoading,
  style,
  textStyle,
  ...props
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={[styles.button, style]}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 20, // iOS와 Android 하단 여백 처리
    alignItems: 'center',
    width: 50, // 화면 전체 너비
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    width: 150, // 버튼이 화면 너비의 80%를 차지
    height: 50, // 버튼 높이
    borderRadius: 25, // 둥근 버튼
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoadingButton;