import React from 'react'
import { TetraObject } from "../types"
import { Cell } from './Cell'
import { StyleSheet, View, ViewStyle } from "react-native"
import { Position, PositionId, positionToId } from "~/utils"
import { convertTetraToPositions, FloorCorner, floorTetra } from "~/modules/tetra/utils"

export interface TetraProps {
  tetra: TetraObject
  cellSize: number
  boxSize?: Position
  floor?: FloorCorner
  highlight?: boolean
}

export function Tetra(props: TetraProps) {
  const { tetra, cellSize, boxSize, floor, highlight } = props

  // TODO: check if this should indeed be *4 and *3
  const wrapperSize: ViewStyle = { height: cellSize * 4, width: cellSize * 3 }

  const tetraPositions = convertTetraToPositions(tetra)

  const [width, height] = boxSize ? [boxSize.x + 1, boxSize.y + 1] : tetraPositions.reduce((acc, val) => {
    acc[0] = Math.max(val.x + 1, acc[0])
    acc[1] = Math.max(val.y + 1, acc[1])
    return acc
  }, [0, 0])

  const flooredTetra = floorTetra(tetraPositions, floor, boxSize)
  const posIds: PositionId[] = flooredTetra.map(positionToId)

  return (
    <View style={[styles.wrapper, wrapperSize]}>
      {[...Array(height)].map((_, y) => (
        <View key={y} style={styles.row}>
          {[...Array(width)].map((_, x) => {
            const isVisible = posIds.includes(positionToId({ x, y }))

            return (
              <Cell
                key={`${y}-${x}-${highlight}-${isVisible}`}
                transparent
                filled={!highlight && isVisible}
                selected={highlight && isVisible}
                size={cellSize}
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  row: {
    flexDirection: 'row'
  }
})
