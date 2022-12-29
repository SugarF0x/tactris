/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React from 'react'
import { Text } from "react-native"
import { Button } from "~/components"
import { cyan } from "~/styles"
import { useGridStore, useTemporalGridStore } from "~/modules/grid"
import { useTemporalScoreStore } from "~/modules/score"

export function Undo() {
  const filledIdsLength = useGridStore(state => state.filledIds.length)
  const gridTemporal = useTemporalGridStore()
  const scoreTemporal = useTemporalScoreStore()

  const canUndo = Boolean(gridTemporal.pastStates.length)

  const previousFilledIdsLength = gridTemporal.pastStates[gridTemporal.pastStates.length - 1]?.filledIds?.length ?? 0
  const didCollect = Boolean(filledIdsLength < previousFilledIdsLength)

  function handleUndo() {
    gridTemporal.undo()
    if (didCollect) scoreTemporal.undo()
  }

  return (
    <Button disabled={!canUndo} onPress={handleUndo}>
      <Text style={{ color: cyan }}>
        Undo
      </Text>
    </Button>
  )
}
