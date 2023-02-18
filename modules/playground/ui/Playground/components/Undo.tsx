/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React from 'react'
import { Button, Card, Counter } from "~/components"
import { StyleSheet, Text, View } from "react-native"
import { cyan, Fonts } from "~/styles"
import { platform } from "~/utils"
import { useTemporalStore } from "~/services/store"

// TODO: implement undo score cost
const DUMMY_SCORE_COST = 123

export function Undo() {
  const temporalStore = useTemporalStore()

  const canUndo = Boolean(temporalStore.pastStates.length)

  function handleUndo() {
    temporalStore.undo()
  }

  return (
    <Card style={styles.wrapper}>
      <Text style={styles.title}>cost</Text>
      <Counter score={DUMMY_SCORE_COST} styles={{ text: styles.counter }} />
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
