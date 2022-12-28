import React from 'react'
import { Grid, useGridStore } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { Tetra } from "~/modules/tetra"
import { StatusBar } from "expo-status-bar"

export function Playground() {
  const tetras = useGridStore(state => state.tetras)

  return (
    <View style={styles.wrapper}>
      <View style={styles.hud}>
        <ScoreTracker />
        {tetras.map((tetra, index) => (
          <Tetra key={index} fullBox tetra={tetra} size={32} />
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 8
  }
})
