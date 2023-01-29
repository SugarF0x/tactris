/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React, { useCallback } from 'react'
import { StyleSheet, View, Text, Modal } from "react-native"
import { useAvailableMoves } from "~/modules/grid/ui/Grid/hooks"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"
import { Button, Card } from "~/components"
import { useMountEffect } from "~/hooks"

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

  useMountEffect(() => { if (shouldRestart) restart() })

  return (
    <Modal
      animationType={'fade'}
      visible={open && !shouldRestart}
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.wrapper}>
        <Card>
          <Text style={styles.title}>Restart</Text>

          <Text style={styles.body}>You are about to restart an ongoing game with remaining possible moves, are you sure you want to restart?</Text>

          <View style={styles.actions}>
            <Button onPress={onClose}>
              No
            </Button>
            <Button onPress={restart}>
              Yes
            </Button>
          </View>
        </Card>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  title: {},
  body: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
