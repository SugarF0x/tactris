import React, { useRef } from "react"
import { GestureResponderEvent, LayoutRectangle, StyleSheet, LayoutChangeEvent, View, useWindowDimensions } from "react-native"
import { Position, isWithin, PositionId, positionToId } from "~/modules/position"
import { Cell } from "~/modules/tetra/ui/Cell"

const GRID_WIDTH = 10
const GRID_HEIGHT = 10

export function Grid() {
  const { width } = useWindowDimensions()

  const cellSize = width / 10

  function handleMove(e: GestureResponderEvent) {
    const { locationX: x, locationY: y } = e.nativeEvent
    const pos: Position = { x, y }

    for (const [id, item] of Object.entries(itemLayouts.current)) {
      if (!isWithin(pos, item)) continue

      // eslint-disable-next-line no-console
      console.log('found ', id)
      break
    }
  }

  const itemLayouts = useRef<Record<PositionId, LayoutRectangle>>({})

  function handleCellLayout(e: LayoutChangeEvent, id: PositionId) {
    itemLayouts.current[id] = e.nativeEvent.layout
  }

  return (
    <View style={styles.wrapper}>
      {[...Array(GRID_HEIGHT)].map((_, y) => (
        [...Array(GRID_WIDTH)].map((_, x) => (
          <Cell key={positionToId({ x, y })} size={cellSize} onLayout={(e) => handleCellLayout(e, positionToId({ x, y }))} />
        ))
      ))}

      <View style={styles.hitbox} onTouchStart={handleMove} onTouchMove={handleMove} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hitbox: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})
