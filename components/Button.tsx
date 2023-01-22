import React, { useRef } from 'react'
import { Card } from './Card'
import { background, cyan, cyanShadow, Fonts } from "~/styles"
import { Animated, Easing, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"

const defaultAnimationConfig = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
  easing: Easing.inOut(Easing.cubic)
}

export interface ButtonProps {
  children?: string
  disabled?: boolean
  onPress?: () => void
  size?: number
  wrapperStyles?: StyleProp<ViewStyle>
}

export function Button(props: ButtonProps) {
  const { children, disabled, wrapperStyles, onPress, size = 12 } = props

  const shadow = useRef(new Animated.Value(1)).current

  function handlePressIn() {
    Animated.timing(shadow, { ...defaultAnimationConfig, toValue: 0 }).start()
  }

  function handlePressOut() {
    Animated.timing(shadow, defaultAnimationConfig).start()
  }

  return (
    <Pressable disabled={disabled} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[!disabled && cyanShadow, { shadowOpacity: shadow }, disabled && styles.disabled]}>
        <Card style={[styles.wrapper, wrapperStyles]}>
          <Text style={[styles.title, { fontSize: size }]}>
            {children}
          </Text>
        </Card>
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: cyan
  },
  disabled: {
    opacity: .5
  },
  title: {
    color: background,
    fontFamily: Fonts.MAIN_BOLD,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})
