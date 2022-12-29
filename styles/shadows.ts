import { cyan } from "~/styles/colors"
import { generateBoxShadowStyle } from "~/utils"

export const cyanShadow = generateBoxShadowStyle({
  shadowRadius: 25,
  shadowOpacity: .5,
  elevation: 4,
  shadowColorAndroid: cyan,
  shadowColorIos: cyan,
})
