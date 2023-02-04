import { cyan } from "~/styles/colors"
import { generateBoxShadowStyle } from "~/utils"

export const cyanShadow = generateBoxShadowStyle({
  shadowRadius: 25,
  shadowOpacity: .5,
  elevation: 32,
  shadowColor: cyan,
})
