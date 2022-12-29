import React, { ReactNode, useRef } from 'react'
import { Card } from './Card'
import { cyanShadow } from "~/styles"
import { Animated, Easing, Pressable } from "react-native"

const defaultAnimationConfig = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
  easing: Easing.inOut(Easing.cubic)
}

export interface ButtonProps {
  children?: ReactNode
  onPress?: () => void
}

export function Button(props: ButtonProps) {
  const { children, onPress } = props

  const shadow = useRef(new Animated.Value(1)).current

  function handlePressIn() {
    Animated.timing(shadow, { ...defaultAnimationConfig, toValue: 0 }).start()
  }

  function handlePressOut() {
    Animated.timing(shadow, defaultAnimationConfig).start()
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[cyanShadow, { shadowOpacity: shadow }]}>
        <Card>
          {children}
        </Card>
      </Animated.View>
    </Pressable>
  )
}
