import { Platform } from "react-native"

export function platform<T>(ios: T, android: T): T {
  if (Platform.OS === 'ios') return ios
  return android
}
