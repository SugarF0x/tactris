import React, { useEffect } from 'react'
import { LayoutChangeEvent } from "react-native"
import { Cell } from "~/modules/tetra/ui"
import { PositionId } from "~/utils"
import { Audio } from "expo-av"
import { playAndUnload } from "~/utils"
import { useRootStore } from "~/services/store"

export interface GridCellProps {
  onLayout: (e: LayoutChangeEvent) => void
  size: number
  posId: PositionId
}

export function GridCell(props: GridCellProps) {
  const { size, onLayout, posId } = props

  const isFilled = useRootStore(state => state.filledIds.includes(posId))
  const isSelected = useRootStore(state => state.selectedIds.includes(posId))

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('~/assets/sounds/select.mp3'))
    await playAndUnload(sound)
  }

  useEffect(() => {
    if (isSelected) void playSound()
  }, [isSelected])

  return (
    <Cell
      size={size}
      filled={isFilled}
      selected={isSelected}
      onLayout={onLayout}
    />
  )
}
