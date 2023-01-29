import { Animated } from "react-native"

export const midSequenceFunctionCall = (fn: () => void): Animated.CompositeAnimation => {
  return {
    start: (cb) => {
      fn()
      cb?.({ finished: true })
    },
    stop: () => {},
    reset: () => {}
  }
}
