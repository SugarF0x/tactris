import React from 'react'
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { FloorCorner, Tetra, TetraProps } from "~/modules/tetra"
import { cyan } from "~/styles"
import { Card } from "~/components"

export interface AvailableTetrasProps {
  style?: StyleProp<ViewStyle>
}

const commonTetraProps: Pick<TetraProps, 'cellSize' | 'boxSize'> = {
  cellSize: 32,
  boxSize: { x: 3, y: 3 },
}

export function AvailableTetras(props: AvailableTetrasProps) {
  const { style } = props
  const [firstTetra, secondTetra] = useAvailableMoves()

  return (
    <View style={[styles.wrapper, style]}>
      <Card style={styles.container}>
        <Tetra
          tetra={firstTetra}
          highlight={firstTetra.canPlace}
          floor={FloorCorner.TOP_RIGHT}
          style={styles.tetra}
          {...commonTetraProps}
        />

        <View style={styles.divider} />

        <Tetra
          tetra={secondTetra}
          highlight={secondTetra.canPlace}
          floor={FloorCorner.TOP_LEFT}
          style={styles.tetra}
          {...commonTetraProps}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0
  },
  tetra: {
    flex: 1,
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: cyan,
    opacity: .25,
    borderRadius: 1,
  }
})
