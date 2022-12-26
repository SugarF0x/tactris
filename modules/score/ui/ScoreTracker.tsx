import React from 'react'
import { useScoreStore } from "~/modules/score/store"
import { StyleSheet, Text, View } from "react-native"

export function ScoreTracker() {
  const score = useScoreStore(state => state.score)
  const highScore = useScoreStore(state => state.highScore)

  return (
    <View style={styles.wrapper}>
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.highScore}>{highScore}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minWidth: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#383838'
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
