import React from 'react'
import { TetraObject } from "../types"
import { Cell } from './Cell'
import { StyleSheet, View, ViewStyle } from "react-native"
import { PositionId, positionToId } from "~/modules/position"

export interface TetraProps {
  tetra: TetraObject
  size: number
  fullBox?: boolean
}

export function Tetra(props: TetraProps) {
  const { tetra, size, fullBox } = props

  const wrapperSize: ViewStyle = { height: size * 4, width: size * 3 }

  const [width, height] = fullBox ? [4, 4] : tetra.positions.reduce((acc, val) => {
    acc[0] = Math.max(val.x + 1, acc[0])
    acc[1] = Math.max(val.y + 1, acc[1])
    return acc
  }, [0, 0])

  const posIds: PositionId[] = tetra.positions.map(positionToId)

  return (
    <View style={[styles.wrapper, wrapperSize]}>
      {[...Array(height)].map((_, y) => (
        <View key={y} style={styles.row}>
          {[...Array(width)].map((_, x) => (
            <Cell key={x} transparent selected={posIds.includes(positionToId({ x, y }))} size={size} />
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
