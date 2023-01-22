/* eslint-disable react/jsx-no-literals,react-native/no-raw-text */
import React from 'react'
import { Button } from "~/components"
import { Alert } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"

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
    <Button onPress={handleRestart}>
      Restart
    </Button>
  )
}
