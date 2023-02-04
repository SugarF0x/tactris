import React from 'react'
import { StyleSheet, Text, TextStyle } from "react-native"
import { cyan, Fonts } from "~/styles"
import { opacify } from "~/utils"

const SCORE_LENGTH_CAP = 4

export interface CounterProps {
  disabled?: boolean
  score: number
  styles?: Partial<Record<keyof typeof defaultStyles, TextStyle>>
}

export function Counter(props: CounterProps) {
  const { score, disabled, styles } = props

  return (
    <Text style={[defaultStyles.text, styles?.text]}>
      <Text style={[defaultStyles.disabled, styles?.disabled]}>{'0'.repeat(SCORE_LENGTH_CAP - score.toString().length)}</Text>
      <Text style={disabled && [defaultStyles.disabled, styles?.disabled]}>{score}</Text>
    </Text>
  )
}

const defaultStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: cyan,
    fontFamily: Fonts.LCD,
    textAlign: 'center',
  },
  disabled: {
    color: opacify(cyan, .25)
  }
})
