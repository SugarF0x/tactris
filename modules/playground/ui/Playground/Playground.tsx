import React from 'react'
import { Grid } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { StatusBar } from "expo-status-bar"
import { Restart, Undo, AvailableTetras } from "~/modules/playground/ui/Playground/components"
import Title from "~/modules/playground/ui/Playground/assets/title.svg"
import { background, gridGradient } from "~/styles"
import { LinearGradient } from 'expo-linear-gradient'

export function Playground() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.hud}>
        <Title style={styles.title} />
        <AvailableTetras style={styles.tetrasContainer} />
      </View>

      <View style={styles.gridWrapper}>
        <LinearGradient colors={[background, gridGradient]} style={styles.gridBorder}/>
        <Grid />
        <LinearGradient colors={[gridGradient, background]} style={styles.gridBorder}/>
      </View>

      <View style={[styles.hud, styles.controls]}>
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
    backgroundColor: background
  },
  hud: {
    width: '100%',
  },
  controls: {
    marginTop: 12
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
  gridWrapper: {
    marginTop: 12,
  },
  gridBorder: {
    height: 8,
  },
  spacer: {
    marginVertical: 4
  },
  title: {
    alignSelf: 'center',
  }
})
