import React from 'react'
import { Grid } from "~/modules/grid"
import { StyleSheet, View } from "react-native"
import { ScoreTracker } from "~/modules/score/ui"
import { StatusBar } from "expo-status-bar"
import { Restart, Undo, AvailableTetras } from "~/modules/playground/ui/Playground/components"
import { Title } from "~/modules/playground/ui/Playground/assets"
import { background, gridGradient } from "~/styles"
import { LinearGradient } from 'expo-linear-gradient'

export function Playground() {
  return (
    <View style={styles.wrapper}>
      <Title style={styles.title} />

      <View style={styles.hud}>
        <AvailableTetras style={styles.tetrasContainer} />
      </View>

      <View style={styles.gridWrapper}>
        <LinearGradient colors={[background, gridGradient]} style={styles.gridBorder}/>
        <Grid />
        <LinearGradient colors={[gridGradient, background]} style={styles.gridBorder}/>
      </View>

      <View style={[styles.hud, styles.controls]}>
        <ScoreTracker />
        <Restart />
        <Undo />
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
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controls: {
    marginTop: 12
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
  title: {
    alignSelf: 'center',
  }
})
