import { useCallback, useEffect, useMemo, useRef } from "react"
import { Animated, Easing } from "react-native"

export interface FadeOptions {
  isOpen: boolean
  onClose: () => void
  restart: () => void
  shouldRestart: boolean
}

export function useFade(options: FadeOptions) {
  const { onClose, shouldRestart, restart, isOpen } = options

  const fadeValue = useRef(new Animated.Value(0)).current

  const fadeConfig = useMemo(() => ({ toValue: 1, easing: Easing.inOut(Easing.cubic), useNativeDriver: true, duration: 200 }), [])
  const fadeIn = useCallback(() => Animated.timing(fadeValue, fadeConfig).start(), [fadeValue, fadeConfig])
  const fadeOut = useCallback(() => Animated.timing(fadeValue, { ...fadeConfig, toValue: 0 }).start(onClose), [fadeConfig, fadeValue, onClose])

  useEffect(() => {
    if (!isOpen) return undefined

    if (!shouldRestart) return void fadeIn()

    onClose()
    restart()

    return undefined
  }, [fadeIn, isOpen, onClose, restart, shouldRestart])

  const handleConfirm = useCallback(() => {
    restart()
    fadeOut()
  }, [fadeOut, restart])

  return {
    fadeValue,
    onConfirm: handleConfirm,
    onCancel: fadeOut
  }
}
