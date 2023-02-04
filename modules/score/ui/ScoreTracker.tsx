import React from 'react'
import { useScoreStore } from "~/modules/score/store"
import { StyleSheet } from "react-native"
import { Card, Counter } from "~/components"
import { cyan } from "~/styles"
import { opacify } from "~/utils"
import { Trophy } from "~/modules/score/ui/assets"

export function ScoreTracker() {
  const score = useScoreStore(state => state.score)
  const highScore = useScoreStore(state => state.highScore)

  return (
    <Card style={styles.wrapper}>
      <Counter score={score} styles={{ text: styles.score }} />
      <Card style={styles.highScoreWrapper}>
        <Counter score={highScore} styles={{ disabled: styles.highScore }} disabled />
        <Trophy />
      </Card>
    </Card>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 120,
    paddingHorizontal: 6,
  },
  highScoreWrapper: {
    borderColor: opacify(cyan, .5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 12
  },
  score: {
    fontSize: 40
  },
  highScore: {
    fontSize: 20,
    marginBottom: -2
  }
})
