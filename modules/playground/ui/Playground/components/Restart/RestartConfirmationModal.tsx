/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React, { useCallback, useRef } from 'react'
import { Animated, Easing, StyleSheet, View, Text } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"
import { Button, Card } from "~/components"
import { useMountEffect } from "~/hooks"

export interface RestartConfirmationModalProps {
  open: boolean
  onClose: () => void
}

const defaultAnimationConfig = {
  toValue: 1,
  easing: Easing.inOut(Easing.cubic),
  duration: 500,
  useNativeDriver: true
}

export function RestartConfirmationModal(props: RestartConfirmationModalProps) {
  const { onClose, open } = props

  const tetras = useAvailableMoves()
  const shouldRestart = tetras.every(tetra => !tetra.canPlace)

  const restartScore = useScoreStore(state => state.restart)
  const restartGrid = useGridStore(state => state.restart)

  const animation = useRef(new Animated.Value(0)).current
  const popInSequence = useRef(Animated.timing(animation, defaultAnimationConfig)).current
  const popOutSequence = useRef(Animated.timing(animation, { ...defaultAnimationConfig, toValue: 0 })).current

  const restart = useCallback(() => {
    onClose()
    restartGrid()
    restartScore()
  }, [onClose, restartGrid, restartScore])

  const handleConfirmation = useCallback(() => void popOutSequence.start(restart), [popOutSequence, restart])
  const handleCancellation = useCallback(() => void popOutSequence.start(onClose), [onClose, popOutSequence])

  useMountEffect(() => {
    if (!shouldRestart) return void popInSequence.start()

    onClose()
    restart()
  })

  if (!open && shouldRestart) return null
  return (
    <Animated.View
      style={[
        styles.wrapper,
        { transform: [{ scale: animation }] }
      ]}
    >
      <Card>
        <Text style={styles.title}>Restart</Text>

        <Text style={styles.body}>You are about to restart an ongoing game with remaining possible moves, are you sure you want to restart?</Text>

        <View style={styles.actions}>
          <Button onPress={handleCancellation}>
            No
          </Button>
          <Button onPress={handleConfirmation}>
            Yes
          </Button>
        </View>
      </Card>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  title: {},
  body: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
