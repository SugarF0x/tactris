import React from 'react'
import { Grid } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { StatusBar } from "expo-status-bar"
import { Restart, Undo, AvailableTetras } from "~/modules/playground/ui/Playground/components"
import Title from "~/modules/playground/ui/Playground/assets/title.svg"

export function Playground() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.hud}>
        <Title style={styles.title} />
        <AvailableTetras style={styles.tetrasContainer} />
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
  tetrasContainer: {
    marginTop: 16
  },
  spacer: {
    marginVertical: 4
  },
  title: {
    alignSelf: 'center',
  }
})
