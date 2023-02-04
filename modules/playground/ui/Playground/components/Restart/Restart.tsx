/* eslint-disable react/jsx-no-literals,react-native/no-raw-text */
import React, { useCallback, useState } from 'react'
import { Button, Card } from "~/components"
import { StyleSheet, View } from "react-native"
import { Speaker } from "~/modules/playground/ui/Playground/assets"
import { RestartConfirmationModal } from "./RestartConfirmationModal"

export function Restart() {
  const [isRestarting, setIsRestarting] = useState(false)

  const handleRestart = useCallback(() => { setIsRestarting(true) }, [])
  const handleModalClose = useCallback(() => { setIsRestarting(false) }, [])

  return (
    <View style={styles.wrapper}>
      <Speaker />

      <Card style={styles.card}>
        <Button onPress={handleRestart} style={styles.button}>
          Restart
        </Button>
      </Card>

      <RestartConfirmationModal isOpen={isRestarting} onClose={handleModalClose} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    paddingHorizontal: 6,
    paddingVertical: 6
  },
  button: {
    paddingHorizontal: 7,
    paddingVertical: 2
  }
})
