import React from 'react'
import { Grid } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { FloorCorner, Tetra } from "~/modules/tetra"
import { StatusBar } from "expo-status-bar"
import { Restart, Undo } from "~/modules/playground/ui/Playground/components"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"

export function Playground() {
  const tetras = useAvailableMoves()

  return (
    <View style={styles.wrapper}>
      <View style={styles.hud}>
        <View style={styles.hudItem}>
          {tetras.map((tetra, index) => (
            <Tetra
              key={index}
              tetra={tetra}
              highlight={tetra.canPlace}
              cellSize={32}
              boxSize={{ x: 3, y: 3 }}
              floor={[FloorCorner.TOP_RIGHT, FloorCorner.TOP_LEFT][index]}
            />
          ))}
        </View>
      </View>
      <Grid />
      <View style={styles.hud}>
        <View style={styles.hudItem}>
          <ScoreTracker />
          <View>
            <Undo />
            <View style={styles.spacer} />
            <Restart />
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  hud: {
    width: '100%',
    paddingVertical: 8
  },
  hudItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  spacer: {
    marginVertical: 4
  }
})
