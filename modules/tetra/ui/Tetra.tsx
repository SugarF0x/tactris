import React from 'react'
import { TetraObject } from "../types"
import { Cell } from './Cell'
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Position, PositionId, positionToId } from "~/utils"
import { convertTetraToPositions, FloorCorner, floorTetra } from "~/modules/tetra/utils"

export interface TetraProps {
  tetra: TetraObject
  cellSize: number
  boxSize?: Position
  floor?: FloorCorner
  highlight?: boolean
  style?: StyleProp<ViewStyle>
}

export function Tetra(props: TetraProps) {
  const { tetra, cellSize, boxSize, floor, highlight, style } = props

  const tetraPositions = convertTetraToPositions(tetra)

  const [width, height] = boxSize ? [boxSize.x + 1, boxSize.y + 1] : tetraPositions.reduce((acc, val) => {
    acc[0] = Math.max(val.x + 1, acc[0])
    acc[1] = Math.max(val.y + 1, acc[1])
    return acc
  }, [0, 0])

  const flooredTetra = floorTetra(tetraPositions, floor, boxSize)
  const posIds: PositionId[] = flooredTetra.map(positionToId)

  return (
    <View style={[styles.wrapper, style]}>
      {[...Array(height)].map((_, y) => (
        <View key={y} style={styles.row}>
          {[...Array(width)].map((_, x) => {
            const isVisible = posIds.includes(positionToId({ x, y }))

            return (
              <Cell
                key={`${y}-${x}-${highlight}-${isVisible}`}
                filled={!highlight && isVisible}
                selected={highlight && isVisible}
                size={cellSize}
                transparent
              />
            )
          })}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  row: {
    flexDirection: 'row'
  }
})
