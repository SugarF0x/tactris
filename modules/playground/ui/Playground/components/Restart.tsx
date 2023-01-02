/* eslint-disable react/jsx-no-literals */
import React from 'react'
import { Button } from "~/components"
import { Text } from "react-native"
import { cyan } from "~/styles"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"

export function Restart() {
  const tetras = useAvailableMoves()
  const canRestart = tetras.every(tetra => !tetra.canPlace)

  const restartScore = useScoreStore(state => state.restart)
  const restartGrid = useGridStore(state => state.restart)

  function handleRestart() {
    restartGrid()
    restartScore()
  }

  return (
    <Button disabled={!canRestart} onPress={handleRestart}>
      <Text style={{ color: cyan }}>
        Restart
      </Text>
    </Button>
  )
}
