/* eslint-disable react/jsx-no-literals,react-native/no-raw-text */
import React from 'react'
import { Button, Card } from "~/components"
import { Alert, StyleSheet, View } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"
import { Speaker } from "~/modules/playground/ui/Playground/assets"

export function Restart() {
  const tetras = useAvailableMoves()
  const shouldRestart = tetras.every(tetra => !tetra.canPlace)

  const restartScore = useScoreStore(state => state.restart)
  const restartGrid = useGridStore(state => state.restart)

  function restart() {
    restartGrid()
    restartScore()
  }

  function handleRestart() {
    if (shouldRestart) return restart()

    Alert.alert(
      "Restart",
      "You are about to restart an ongoing game with remaining possible moves, are you sure you want to restart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Restart", onPress: restart, style: "default" },
      ]
    )
  }

  return (
    <View style={styles.wrapper}>
      <Speaker />
      <Card style={styles.card}>
        <Button onPress={handleRestart} wrapperStyles={styles.button}>
          Restart
        </Button>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  button: {
    paddingHorizontal: 7,
    paddingVertical: 2
  }
})
