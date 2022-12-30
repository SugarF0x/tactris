import React from 'react'
import { TetraObject } from "../types"
import { Cell } from './Cell'
import { StyleSheet, View, ViewStyle } from "react-native"
import { Position, PositionId, positionToId } from "~/modules/position"
import { FloorCorner, floorTetra } from "~/modules/tetra/utils"

export interface TetraProps {
  tetra: TetraObject
  cellSize: number
  boxSize?: Position
  floor?: FloorCorner
}

export function Tetra(props: TetraProps) {
  const { tetra, cellSize, boxSize, floor } = props

  const wrapperSize: ViewStyle = { height: cellSize * 4, width: cellSize * 3 }

  const [width, height] = boxSize ? [boxSize.x + 1, boxSize.y + 1] : tetra.positions.reduce((acc, val) => {
    acc[0] = Math.max(val.x + 1, acc[0])
    acc[1] = Math.max(val.y + 1, acc[1])
    return acc
  }, [0, 0])

  const flooredTetra = floorTetra(tetra.positions, floor, boxSize)
  const posIds: PositionId[] = flooredTetra.map(positionToId)

  return (
    <View style={[styles.wrapper, wrapperSize]}>
      {[...Array(height)].map((_, y) => (
        <View key={y} style={styles.row}>
          {[...Array(width)].map((_, x) => (
            <Cell key={x} transparent selected={posIds.includes(positionToId({ x, y }))} size={cellSize} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  row: {
    flexDirection: 'row'
  }
})
