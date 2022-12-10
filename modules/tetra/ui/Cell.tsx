import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { generateBoxShadowStyle } from "~/utils"

export interface CellProps {
  selected?: boolean
  filled?: boolean
  size?: number
  style?: StyleProp<ViewStyle>
}

export function Cell(props: CellProps) {
  const { filled, selected, size, style } = props

  const cellSize: ViewStyle | false = Boolean(size) && { width: size, height: size }

  return (
    <View style={[styles.wrapper, cellSize, style]}>
      <View style={[styles.item, selected && styles.selected, filled && styles.filled]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    padding: 1
  },
  item: {
    flex: 1
  },
  selected: {
    backgroundColor: '#adf',
    ...generateBoxShadowStyle({
      shadowRadius: 25,
      shadowOpacity: .5,
      elevation: 4,
      shadowColorAndroid: '#adf',
      shadowColorIos: '#adf',
    })
  },
  filled: {
    backgroundColor: 'white'
  }
})
