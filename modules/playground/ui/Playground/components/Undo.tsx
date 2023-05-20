/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React from 'react'
import { Button, Card, Counter } from "~/components"
import { useGridStore, useTemporalGridStore } from "~/modules/grid"
import { getUndoCost, useScoreStore, useTemporalScoreStore } from "~/modules/score"
import { StyleSheet, Text, View } from "react-native"
import { cyan, Fonts } from "~/styles"
import { platform } from "~/utils"
import { getCanAffordUndo } from "~/modules/score/store/helpers"

export function Undo() {
  const gridTemporal = useTemporalGridStore()
  const filledIdsLength = useGridStore(state => state.filledIds.length)

  const scoreTemporal = useTemporalScoreStore()
  const currentScore = useScoreStore(state => state.score)
  const previousScore = scoreTemporal.pastStates[0]?.score ?? currentScore
  const undoCost = useScoreStore(getUndoCost)
  const undoScore = useScoreStore(state => state.undo)

  const previousFilledIdsLength = gridTemporal.pastStates[gridTemporal.pastStates.length - 1]?.filledIds?.length ?? 0
  const didCollect = Boolean(filledIdsLength < previousFilledIdsLength)

  const canAffordUndo = getCanAffordUndo(currentScore, previousScore, undoCost, didCollect)
  const canUndo = canAffordUndo && Boolean(gridTemporal.pastStates.length)

  function handleUndo() {
    gridTemporal.undo()
    undoScore(previousScore, didCollect)
  }

  return (
    <Card style={styles.wrapper}>
      <Text style={styles.title}>cost</Text>
      <Counter score={undoCost} styles={{ text: styles.counter }} />
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} size={20} disabled={!canUndo} onPress={handleUndo}>
          Undo
        </Button>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 6
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.MAIN_BOLD,
    color: cyan,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  counter: {
    marginTop: platform(5, 0),
    fontSize: 20,
    marginBottom: platform(0, 6),
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  }
})
