import React from 'react'
import { StyleSheet } from "react-native"
import { Card, Counter } from "~/components"
import { cyan } from "~/styles"
import { opacify, platform } from "~/utils"
import { Trophy } from "~/modules/score/ui/assets"
import { useRootStore } from "~/services/store"

export function ScoreTracker() {
  const score = useRootStore(state => state.score)
  const highScore = useRootStore(state => state.highScore)

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
    justifyContent: 'center',
  },
  highScoreWrapper: {
    borderColor: opacify(cyan, .5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 12,
    marginTop: 4
  },
  score: {
    fontSize: 40,
    marginBottom: platform(-6, 0)
  },
  highScore: {
    fontSize: 20,
    marginBottom: platform(-2, 0)
  }
})
