import React from 'react'
import { Grid, useGridStore } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { Tetra } from "~/modules/tetra"
import { StatusBar } from "expo-status-bar"
import { Undo } from "~/modules/playground/ui/Playground/components"

export function Playground() {
  const tetras = useGridStore(state => state.tetras)

  return (
    <View style={styles.wrapper}>
      <View style={styles.hud}>
        <View style={styles.hudItem}>
          {tetras.map((tetra, index) => (
            <Tetra key={index} fullBox tetra={tetra} size={32} />
          ))}
        </View>
        <View style={styles.hudItem}>
          <ScoreTracker />
          <Undo />
        </View>
      </View>
      <Grid />
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
  }
})