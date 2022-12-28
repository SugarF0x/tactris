import React from 'react'
import { useScoreStore } from "~/modules/score/store"
import { StyleSheet, Text } from "react-native"
import { Card } from "~/components"

export function ScoreTracker() {
  const score = useScoreStore(state => state.score)
  const highScore = useScoreStore(state => state.highScore)

  return (
    <Card style={styles.wrapper}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.highScore}>{highScore}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 100
  },
  score: {
    fontSize: 28,
    fontWeight: '700',
    color: '#adf'
  },
  highScore: {
    fontSize: 14,
    color: '#adf',
    opacity: .5
  }
})
