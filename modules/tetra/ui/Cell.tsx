import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { cyanShadow } from "~/styles"
import { cyan } from "~/styles"

export interface CellProps {
  selected?: boolean
  filled?: boolean
  transparent?: boolean
  size?: number
  style?: StyleProp<ViewStyle>
  onLayout?: (e: LayoutChangeEvent) => void
}

export function Cell(props: CellProps) {
  const { filled, selected, transparent, size, style, onLayout } = props

  const scale = useRef(new Animated.Value(0)).current
  const isShown = useRef(false)

  const [cachedProps, setCachedProps] = useState(props)

  useEffect(() => {
    const toValue = Number(Boolean(selected || filled))

    if (Boolean(toValue) === isShown.current) return undefined
    isShown.current = Boolean(toValue)

    Animated.timing(scale, {
      toValue,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.cubic)
    }).start(() => { setCachedProps(props) })
  }, [selected, filled, scale, props])

  const cellSize: ViewStyle | false = Boolean(size) && { width: size, height: size }

  return (
    <View style={[styles.wrapper, cellSize, style]} onLayout={onLayout}>
      <View style={[styles.background, transparent && styles.transparent]}>
        <Animated.View
          style={[
            styles.item,
            (selected || cachedProps.selected) && styles.selected,
            (filled || cachedProps.filled) && styles.filled,
            { transform: [{ scale }] }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 1
  },
  background: {
    flex: 1,
    backgroundColor: 'black'
  },
  item: {
    flex: 1,
    transform: [{ scale: .5 }]
  },
  selected: {
    backgroundColor: cyan,
    ...cyanShadow
  },
  filled: {
    backgroundColor: 'white'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
})
