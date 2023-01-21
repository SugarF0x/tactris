import React from 'react'
import { useScoreStore } from "~/modules/score/store"
import { StyleSheet, Text } from "react-native"
import { Card } from "~/components"
import { cyan, Fonts } from "~/styles"
import { opacify } from "~/utils"
import { Trophy } from "~/modules/score/ui/assets"

const SCORE_LENGTH_CAP = 4

export function ScoreTracker() {
  const score = useScoreStore(state => state.score)
  const highScore = useScoreStore(state => state.highScore)

  return (
    <Card style={styles.wrapper}>
      <Text style={styles.score}>
        <Text style={styles.scorePlaceholder}>{'0'.repeat(SCORE_LENGTH_CAP - score.toString.length)}</Text>
        {score}
      </Text>
      <Card style={styles.highScoreWrapper}>
        <Text style={styles.highScore}>{String(highScore).padStart(SCORE_LENGTH_CAP, '0')}</Text>
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
  score: {
    fontSize: 40,
    fontWeight: '700',
    color: cyan,
    fontFamily: Fonts.LCD,
    textAlign: 'center'
  },
  scorePlaceholder: {
    opacity: .25
  },
  highScoreWrapper: {
    borderColor: opacify(cyan, .5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highScore: {
    fontSize: 20,
    color: cyan,
    opacity: .5,
    fontFamily: Fonts.LCD
  }
})
