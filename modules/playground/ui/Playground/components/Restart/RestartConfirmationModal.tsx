/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet, View, Text, Animated, Easing } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"
import { Button, Card } from "~/components"
import { opacify } from "~/utils"
import { cyan, Fonts } from "~/styles"
import { Portal } from "@gorhom/portal"

export interface RestartConfirmationModalProps {
  open: boolean
  onClose: () => void
}

export function RestartConfirmationModal(props: RestartConfirmationModalProps) {
  const { onClose, open } = props

  const tetras = useAvailableMoves()
  const shouldRestart = tetras.every(tetra => !tetra.canPlace)

  const restartScore = useScoreStore(state => state.restart)
  const restartGrid = useGridStore(state => state.restart)

  const restart = useCallback(() => {
    onClose()
    restartGrid()
    restartScore()
  }, [onClose, restartGrid, restartScore])

  const fadeValue = useRef(new Animated.Value(0)).current

  const fadeConfig = useMemo(() => ({ toValue: 1, easing: Easing.inOut(Easing.cubic), useNativeDriver: true, duration: 200 }), [])
  const fadeIn = useMemo(() => Animated.timing(fadeValue, fadeConfig), [fadeValue, fadeConfig])
  const fadeOut = useMemo(() => Animated.timing(fadeValue, { ...fadeConfig, toValue: 0 }), [fadeConfig, fadeValue])

  useEffect(() => {
    if (!open) return undefined

    if (shouldRestart) restart()
    else fadeIn.start()

    return undefined
  }, [fadeIn, open, restart, shouldRestart])

  const handleConfirm = useCallback(() => {
    restartGrid()
    restartScore()

    fadeOut.start(onClose)
  }, [fadeOut, onClose, restartGrid, restartScore])

  const handleCancel = useCallback(() => {
    fadeOut.start(onClose)
  }, [fadeOut, onClose])

  if (!open) return null
  return (
    <Portal>
      <Animated.View style={[styles.wrapper, { opacity: fadeValue }]}>
        <Card style={styles.card}>
          <Text style={styles.title}>Restart</Text>

          <Text style={styles.body}>You are about to restart an ongoing game with remaining possible moves, are you sure you want to restart?</Text>

          <View style={styles.actions}>
            <Card style={styles.buttonWrapper}>
              <Button onPress={handleCancel} style={styles.button}>
                No
              </Button>
            </Card>
            <Card style={[styles.buttonWrapper, styles.spaced]}>
              <Button onPress={handleConfirm} style={styles.button}>
                Yes
              </Button>
            </Card>
          </View>
        </Card>
      </Animated.View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    height: '100%',
    backgroundColor: opacify('#000000', .5),
    justifyContent: 'center',
    paddingHorizontal: 56
  },
  card: {
    overflow: 'hidden'
  },
  title: {
    fontFamily: Fonts.MAIN_BOLD,
    color: cyan,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24
  },
  body: {
    fontFamily: Fonts.MAIN,
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonWrapper: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 6
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  spaced: {
    marginLeft: 16
  }
})
