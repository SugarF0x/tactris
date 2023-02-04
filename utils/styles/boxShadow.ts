import { Platform, ViewStyle } from "react-native"

export interface GenerateBoxShadowStyleOptions {
  elevation?: number
  shadowColor?: string
  shadowOpacity?: number
  shadowRadius?: number
  xOffset?: number
  yOffset?: number
}

export function generateBoxShadowStyle(options: GenerateBoxShadowStyleOptions): ViewStyle {
  const {
    elevation = 0,
    shadowColor = 'black',
    shadowOpacity = 1,
    shadowRadius = 0,
    xOffset = 0,
    yOffset = 0,
  } = options

  if (Platform.OS === 'ios') return {
    shadowOffset: { width: xOffset, height: yOffset },
    shadowColor,
    shadowOpacity,
    shadowRadius,
  }

  return {
    elevation,
    shadowColor,
    backgroundColor: '#0000',
  }
}
