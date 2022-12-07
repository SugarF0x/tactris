import { Platform, ViewStyle } from "react-native"

export interface GenerateBoxShadowStyleOptions {
  xOffset: number
  yOffset: number
  shadowColorIos: string
  shadowOpacity: number
  shadowRadius: number
  elevation: number
  shadowColorAndroid: string
}

export function generateBoxShadowStyle(options: GenerateBoxShadowStyleOptions): ViewStyle {
  const { shadowColorAndroid, shadowColorIos, shadowOpacity, shadowRadius, elevation, yOffset, xOffset } = options

  if (Platform.OS === 'ios') return {
    shadowColor: shadowColorIos,
    shadowOffset: { width: xOffset, height: yOffset },
    shadowOpacity,
    shadowRadius,
  }

  return {
    elevation,
    shadowColor: shadowColorAndroid,
  }
}
