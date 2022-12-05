import React from 'react'
import { Tetra } from "../types"
import { StyleSheet, View } from "react-native"
import { PositionId, positionToId } from "~/modules/position"

export interface TetraProps {
  tetra: Tetra
}

export const TetraDisplay = (props: TetraProps) => {
  const { tetra } = props

  const [width, height] = tetra.reduce((acc, val) => {
    acc[0] = Math.max(val.x + 1)
    acc[1] = Math.max(val.y + 1)
    return acc
  }, [0, 0])

  const posIds: PositionId[] = tetra.map(positionToId)

  return (
    <View style={styles.wrapper}>
      {[...Array(height)].map((_, y) => (
        <View key={y} style={styles.row}>
          {[...Array(width)].map((_, x) => (
            <View key={x} style={[styles.item, posIds.includes(positionToId({ x, y })) && styles.filled]} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 2,
  },
  row: {
    flexDirection: 'row'
  },
  item: {
    width: 32,
    height: 32,
    margin: 2
  },
  filled: {
    backgroundColor: 'white',
  }
})
