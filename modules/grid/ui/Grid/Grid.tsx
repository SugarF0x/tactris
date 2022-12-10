import React, { useRef } from "react"
import { GestureResponderEvent, LayoutRectangle, StyleSheet, LayoutChangeEvent, View, useWindowDimensions } from "react-native"
import { Position, isWithin, PositionId, positionToId } from "~/modules/position"
import { useGridStore } from "~/modules/grid/store"
import { GridCell } from "./GridCell"

const GRID_WIDTH = 10
const GRID_HEIGHT = 10

export function Grid() {
  const { width } = useWindowDimensions()

  const { selectId } = useGridStore()

  const cellSize = width / 10

  const currentlySelectedId = useRef<PositionId | null>(null)

  function updateCell(id: PositionId) {
    if (id === currentlySelectedId.current) return
    currentlySelectedId.current = id
    selectId(id)
  }

  function handleMove(e: GestureResponderEvent) {
    const { locationX: x, locationY: y } = e.nativeEvent
    const pos: Position = { x, y }

    for (const [id, item] of Object.entries(itemLayouts.current)) {
      if (!isWithin(pos, item)) continue
      updateCell(id as PositionId)
      break
    }
  }

  function handleStopMove() {
    currentlySelectedId.current = null
  }

  const itemLayouts = useRef<Record<PositionId, LayoutRectangle>>({})

  function handleCellLayout(e: LayoutChangeEvent, id: PositionId) {
    itemLayouts.current[id] = e.nativeEvent.layout
  }

  return (
    <View style={styles.wrapper}>
      {[...Array(GRID_HEIGHT)].map((_, y) => (
        [...Array(GRID_WIDTH)].map((_, x) => {
          const id = positionToId({ x, y })

          return (
            <GridCell
              key={id}
              posId={id}
              size={cellSize}
              onLayout={(e) => handleCellLayout(e, id)}
            />
          )
        })
      ))}

      <View style={styles.hitbox} onTouchStart={handleMove} onTouchMove={handleMove} onTouchEnd={handleStopMove} />
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
