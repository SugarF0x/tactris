import React, { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { background, cyan } from "~/styles"

export interface CardProps {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export function Card(props: CardProps) {
  const { children, style } = props

  return (
    <View style={[styles.wrapper, style]} >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: cyan,
    backgroundColor: background
  }
})
