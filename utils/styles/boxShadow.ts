import { Platform, ViewStyle } from "react-native"
import { cyan } from "~/styles"

export interface GenerateBoxShadowStyleOptions {
  elevation?: number
  shadowColorAndroid?: string
  shadowColorIos?: string
  shadowOpacity?: number
  shadowRadius?: number
  xOffset?: number
  yOffset?: number
}

export function generateBoxShadowStyle(options: GenerateBoxShadowStyleOptions): ViewStyle {
  const {
    elevation = 0,
    shadowColorAndroid = 'black',
    shadowColorIos = 'black',
    shadowOpacity = 1,
    shadowRadius = 0,
    xOffset = 0,
    yOffset = 0,
  } = options

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

export const cyanShadow = generateBoxShadowStyle({
  shadowRadius: 25,
  shadowOpacity: .5,
  elevation: 4,
  shadowColorAndroid: cyan,
  shadowColorIos: cyan,
})
