import React from 'react'
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { generateBoxShadowStyle } from "~/utils"
import { PositionId } from "~/modules/position"
import { useGridStore } from "~/modules/grid"

export interface CellProps {
  selected?: boolean
  filled?: boolean
  transparent?: boolean
  size?: number
  style?: StyleProp<ViewStyle>
  onLayout?: (e: LayoutChangeEvent) => void
  posId?: PositionId
}

export function Cell(props: CellProps) {
  const { filled: filledProp, selected: selectedProp, transparent, size, style, onLayout, posId } = props

  const { cells } = useGridStore()
  const { isFilled, isSelected } = (posId && cells[posId]) ?? {}

  const selected = isSelected || selectedProp
  const filled = isFilled || filledProp

  const cellSize: ViewStyle | false = Boolean(size) && { width: size, height: size }

  return (
    <View style={[styles.wrapper, cellSize, style]} onLayout={onLayout}>
      <View style={[styles.item, transparent && styles.transparent, selected && styles.selected, filled && styles.filled]} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 1
  },
  item: {
    flex: 1,
    backgroundColor: 'black'
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
  },
  transparent: {
    backgroundColor: 'transparent'
  }
})
