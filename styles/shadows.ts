import { cyan } from "~/styles/colors"
import { generateBoxShadowStyle } from "~/utils"

export const cyanShadow = generateBoxShadowStyle({
  shadowRadius: 20,
  shadowOpacity: .5,
  elevation: 24,
  shadowColor: cyan,
})
