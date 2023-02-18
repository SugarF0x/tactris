/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React, { useCallback } from 'react'
import { StyleSheet, View, Text, Animated } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { Button, Card } from "~/components"
import { opacify } from "~/utils"
import { cyan, Fonts } from "~/styles"
import { Portal } from "@gorhom/portal"
import { useFade } from './hooks'
import { useRootStore } from "~/services/store"

export interface RestartConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RestartConfirmationModal(props: RestartConfirmationModalProps) {
  const { onClose, isOpen } = props

  const tetras = useAvailableMoves()
  const shouldRestart = tetras.every(tetra => !tetra.canPlace)

  const restartScore = useRootStore(state => state.restart)
  const restartGrid = useRootStore(state => state.restart)

  const restart = useCallback(() => {
    restartGrid()
    restartScore()
  }, [restartGrid, restartScore])

  const { fadeValue, onConfirm, onCancel } = useFade({ isOpen, onClose, shouldRestart, restart })

  if (!isOpen) return null
  return (
    <Portal>
      <Animated.View style={[styles.wrapper, { opacity: fadeValue }]}>
        <Card style={styles.card}>
          <Text style={styles.title}>Restart</Text>

          <Text style={styles.body}>You are about to restart an ongoing game with possible moves remaining, are you sure you want to restart?</Text>

          <View style={styles.actions}>
            <Card style={styles.buttonWrapper}>
              <Button onPress={onCancel} style={styles.button}>
                No
              </Button>
            </Card>
            <Card style={[styles.buttonWrapper, styles.spaced]}>
              <Button onPress={onConfirm} style={styles.button}>
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
    width: '100%',
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
